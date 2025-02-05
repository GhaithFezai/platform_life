import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ServiceService } from '../services/service.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router, private s: ServiceService) { }

  id: string | null = null;
  user: any = {};

  ngOnInit(): void {
    this.id = localStorage.getItem('id')
    this.getInformation();
  }

  getInformation() {
    
    let id = localStorage.getItem('id');
    this.s.getInformation(id).subscribe(
      (response: any) => {
        if (response && response.length > 0) {
          this.user = response[0];  
        }
        console.log('Utilisateur récupéré :', this.user);
      },
      (error) => {
        console.error('Erreur lors de la récupération des informations :', error);
        Swal.fire('Erreur', 'Impossible de récupérer les informations utilisateur.', 'error');
      }
    );
  }



  update() {
    if (!this.user.Name || !this.user.email || !this.user.password) {
      Swal.fire('Erreur', 'Tous les champs doivent être remplis.', 'error');
      return;
    }
    const id = this.id;
    this.user.id = id;
    this.s.updateProfile(id,this.user).subscribe(
      (response) => {
        Swal.fire('Succès', 'Les informations ont été mises à jour.', 'success');
        this.getInformation()
      },
      (error) => {
        console.error('Erreur lors de la mise à jour :', error);
        Swal.fire('Erreur', 'Impossible de mettre à jour les informations.', 'error');
      }
    );
  }


}
