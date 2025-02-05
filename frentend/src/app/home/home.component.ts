import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  materialName: any[] = [];

  constructor( private s:ServiceService,private http : HttpClient) {}

  ngOnInit() {
    this.getmatierre()
  }
  getmatierre(){
    this.s.getmatierre().subscribe(
    (response: any) => {
      this.materialName = response;
    console.log(response)
    },
    (error) => {
      Swal.fire('Error', 'Could not fetch tasks', 'error');
    }
  );
  }

  addMatiere() {
    

    let id = localStorage.getItem('id');
  Swal.fire({
    title: 'Add New material',
    html: `
      <div style="display: flex; flex-direction: column; gap: 15px; padding: 10px;">
        <label for="materialName" style="font-weight: bold;">Material Name</label>
        <input id="materialName" class="swal2-input" type="text" placeholder="Enter your material name" style="padding: 8px; border-radius: 5px; border: 1px solid #ccc;">
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: 'Add',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#4CAF50',
    cancelButtonColor: '#f44336',
    preConfirm: () => {
      let materialName = (document.getElementById('materialName') as HTMLInputElement).value;
      if (!materialName) {
        Swal.showValidationMessage('Material name is required');
        return false;
      }
      const data = { materialName: materialName, userId: id };
      this.s.addMatiere(data).subscribe({
        next: (response: any) => {
          this.materialName.push({ material: data.materialName ,_id:response._id});
          console.log(this.materialName)
        },
        error: (err) => {
          Swal.fire('Error', 'Failed to add material', 'error');
        }
      });
      return { materialName };
    }
  });
    
  }
  deleteMaterial(index: number, materialId: string) {
    
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        this.s.deleteMaterial(index,materialId).subscribe({
          next: () => {
            this.materialName.splice(index, 1); 
            Swal.fire('Deleted!', 'Your material has been deleted.', 'success');
          },
          error: () => {
            Swal.fire('Error', 'Failed to delete material', 'error');
          }
        });
      }
    });
}



}
