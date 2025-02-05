import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
 

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  materialName: any[] = [];
  tasks: any = {  };


  id: string | null = null; 
  user: any = {  };

  constructor(private http: HttpClient, private router: Router) {}

//////////////////////////////////////////////////////////////////////////////////////
  onSubmit(email:string,password:string,errorMessage:string): void {
    if (!email || !password) {
      errorMessage = 'Veuillez remplir tous les champs.';
      return ;
    }
    const loginData = {
      email: email,
      password: password
    };
    this.http.post('http://localhost:5000/login', loginData)
      .subscribe(
        (response: any) => {
          localStorage.setItem('id', response.userId);
          const USER=response.userId
          this.router.navigate(['/dashboard/home']); 
        },
        (error) => {
          console.error('Erreur de connexion:', error);
          if (error.status === 401) {
            errorMessage = 'Email ou mot de passe incorrect.';
          } else {
            errorMessage = 'Erreur de serveur. Veuillez réessayer plus tard.';
          }
        }
      );
  }
//////////////////////////////////////////////////////////////////////////////////////

onSubmit1(name:string,email:string,password:string): void {
  const data = {
    name: name,
    email: email,
    password: password,
  };
  this.http.post('http://localhost:5000/register', data).subscribe(
    (response) => {
      console.log('Response from server:', response);
      this.router.navigate(['/login']);
    },
    (error) => {
      console.log('Error:', error);
    }
  );
}
//////////////////////////////////////////////////////////////////////////////////////


getmatierre(): Observable<any>{
  let id = localStorage.getItem('id');
  return this.http.get(`http://localhost:5000/getmaterial?id=${id}`)
}

/////////////////////////////////////////////////////////////////////

addMatiere(data : any) : Observable<any>{
  return this.http.post('http://localhost:5000/addmaterial', data)
}


////////////////////////////////////////////////////////////////////

deleteMaterial(index: number, materialId: string) : Observable<any>{
  return this.http.delete(`http://localhost:5000/deletematerial/${materialId}`)
}

//////////////////////////////////////////////////////////////////

getInformation(id : any) : Observable<any>{
  return this.http.get(`http://localhost:5000/getuser?id=${id}`)
}

/////////////////////////////////////////////////////////////////



getTasks():Observable<any> {
  let id = localStorage.getItem('id');
 return this.http.get(`http://localhost:5000/gettasks?id=${id}`)
}


/////////////////////////////////////////////////////////////////////

addTask(data : any) : Observable<any>{
  return this.http.post('http://localhost:5000/addtaske', data)
}
////////////////////////////////////////////////////////////////////

changeStatus(task: any, status: number) {
  return this.http.post('http://localhost:5000/updatetaske', { taskId: task._id, status: status })
}




////////////////////////////////////////////////////////////////////

updateProfile(id : any, user : any):Observable<any>{
  return this.http.put(`http://localhost:5000/updateuser/${id}`, user)
}

////////////////////////////////////////////////////////////////////

save(data :any):Observable<any>{
  
  return this.http.post('http://localhost:5000/savedocument', data)
}

//////////////////////////////////////////////////////////////////


getdocument(idmatierre:any):Observable<any> {
  return this.http.get('http://localhost:5000/getdocument?id='+idmatierre)
}


//////////////////////////////////////////////////////////////

clear(idmatierre:any):Observable<any> {
  return this.http.get('http://localhost:5000/cleardocument?id='+idmatierre)
}

//////////////////////////////////////////////////////////////


getcontact():Observable<any> {
  let id = localStorage.getItem('id');
  return this.http.get('http://localhost:5000/getcontact?id=' + id)
}

//////////////////////////////////////////////////////////////

sendMessage(data:any):Observable<any> {
  return this.http.post("http://localhost:5000/sendMessage", data)
}
////////////////////////////////////////////////////////////

getmessages(id:any,userid:any):Observable<any> {
  return this.http.get(`http://localhost:5000/getmessages?id=${id}&userid=${userid}`)
}
/////////////////////////////////////////////////////////////
 
deleteContact(code:any):Observable<any> {
  return this.http.delete(`http://localhost:5000/deletecontact/${code}`)
} 

}
