import { Component ,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ServiceService } from '../services/service.service';


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrl: './note.component.css'
})
export class NoteComponent implements OnInit{


  constructor(private http: HttpClient, private router: Router, private activate:ActivatedRoute , private s: ServiceService) {} 



  ngOnInit() {

    this.getdocument()
   
  }

  document: any;


  titre:string="";
  contenu:string="";

  save() {
    let idmatierre = this.activate.snapshot.params['id'];
    console.log(idmatierre)
    console.log(this.titre);
    console.log(this.contenu);
    let id = localStorage.getItem('id');  

    const data = {
      titre: this.titre,
      contenu: this.contenu,
      id: id,
      idmatierre:idmatierre,
    };
    this.s.save(data).subscribe(
      (res) => {
       
       Swal.fire('Success', 'Document saved successfully!', 'success');
       this.document.push(data);    

      },
      (error) => {
        console.error('Error saving document:', error);
      }
    );
  }

  
  getdocument(){
    let idmatierre = this.activate.snapshot.params['id'];
    this.s.getdocument(idmatierre).subscribe(
      (response: any) => {
        this.document = response; 
        console.log(this.document)
        this.titre=this.document.titre
        this.contenu=this.document.text
      },
      (error) => {
        console.error('Error retrieving document :', error);
        Swal.fire('Error', 'Could not fetch document ', 'error');
      }
    );
  }

  
  clear(){
    let idmatierre = this.activate.snapshot.params['id'];
    this.s.clear(idmatierre).subscribe(
      (response: any) => {
        this.titre=''
        this.contenu=''
      },
      (error) => {
        console.error('Error retrieving document :', error);
        Swal.fire('Error', 'Could not fetch document ', 'error');
      }
    );

    

  }





}
