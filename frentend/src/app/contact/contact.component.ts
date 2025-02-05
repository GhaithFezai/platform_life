import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router , private s: ServiceService) {
    const codecontact=""
  } 

  contact: any[] = [];
  messages: any[] = [];
  zonnedetext: string = "";
  private intervalId: any; 
  @ViewChild('msgHistory') msgHistory!: ElementRef; 

  ngOnInit() {
    this.getcontact(); 
    this.getmessages();

    this.intervalId = setInterval(() => {
      this.getmessages(); 
    }, 1000); 
    
  }

 

  code: string = "";
    
  deleteContact(code: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.s.deleteContact(code).subscribe(
          (response: any) => {
            console.log('Contact deleted:', response);
            this.contact = this.contact.filter(contact => contact.contactcode !== code);
            Swal.fire('Deleted!', 'The contact has been deleted.', 'success');
          },
          (error) => {
            console.error('Error deleting contact:', error);
            Swal.fire('Error', 'Could not delete the contact', 'error');
          }
        );
      } else {
        Swal.fire('Cancelled', 'The contact was not deleted', 'info');
      }
    });
  }
  
  getcontact() {
    let id = localStorage.getItem('id');
    this.s.getcontact().subscribe(
      (response: any) => {
        this.contact = response; 
        console.log(this.contact);
      },
      (error) => {
        console.error('Error retrieving tasks:', error);
        Swal.fire('Error', 'Could not fetch tasks', 'error');
      }
    );
  }



  addContact() {
    let id = localStorage.getItem('id');
    Swal.fire({
      title: 'Add New Contact',
      html: `
        <div style="display: flex; flex-direction: column; gap: 15px; padding: 10px;">
          <label for="contactCode" style="font-weight: bold;">Contact Code</label>
        <input id="name" class="swal2-input" type="text" placeholder="name of contact" style="padding: 8px; border-radius: 5px; border: 1px solid #ccc;">
          <input id="contactCode" class="swal2-input" type="text" placeholder="Enter the contact code" style="padding: 8px; border-radius: 5px; border: 1px solid #ccc;">
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Add',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#4CAF50', 
      cancelButtonColor: '#f44336', 
      preConfirm: () => {
        const contactCode = (document.getElementById('contactCode') as HTMLInputElement).value;
        const name = (document.getElementById('name') as HTMLInputElement).value;
  
        if (!contactCode || !name) {
          Swal.showValidationMessage('Contact code or name is required');
          return false;
        }
  
        const data = { contactcode: contactCode, name: name, id: id };
  
        return this.http.post('http://localhost:5000/addcontact', data).toPromise()
          .then(() => {
            this.contact.push({ contactcode: contactCode, name: name });
            return { contactcode: contactCode, name: name };
          })
          .catch((error) => {
            Swal.showValidationMessage('Failed to add contact. Please try again.');
            return false;
          });
      }
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('New Contact:', result.value.contactcode); 
      }
    });
  }

  sendMessage() {
    const text = this.zonnedetext; 
    console.log("-------------------------------------", text);
    const id = localStorage.getItem('id');
    const data = {
      id: id,
      message: text,
      idpersonne: this.code,
      status: 0  
    };
    this.s.sendMessage(data).subscribe(
      (response) => {
        this.zonnedetext = '';
        this.getmessages();
      },
      (error) => {
        console.error('Error sending message:', error);
      }
    );
  }
 
  selectpersonne(Contact: any) {
    console.log("ssssssssssssssssssssssssssssssss",Contact);
    this.code = Contact.contactcode;
    this.getmessages();
  }

  getmessages() {
    let iduser=localStorage.getItem("id")
    this.s.getmessages(this.code,iduser).subscribe(
      (response: any) => {
        console.log('messages retrieved:', response);
        this.messages = response; 
      },
      (error) => {
        console.error('Error retrieving tasks:', error);
      }
    );
  }
}
