import { Component,OnInit  } from '@angular/core';
import Swal from 'sweetalert2';


import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { enableDebugTools } from '@angular/platform-browser';
import { response } from 'express';
import { ServiceService } from '../services/service.service';


@Component({
  selector: 'app-taske',
  templateUrl: './taske.component.html',
  styleUrls: ['./taske.component.css']
})
export class TaskeComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router ,private s :ServiceService) {} 

  tasks: any = {  };

  ngOnInit() {
    this.getTasks(); 
  }


  getTasks() {
    let id = localStorage.getItem('id');
    this.s.getTasks().subscribe(
      (response: any) => {
        this.tasks = response; 
      },
      (error) => {
        console.error('Error retrieving tasks:', error);
        Swal.fire('Error', 'Could not fetch tasks', 'error');
      }
    );
  }
  


addTask() {
  let id = localStorage.getItem('id');
  Swal.fire({
    title: 'Add New Task',
    html: `
      <div style="display: flex; flex-direction: column; gap: 15px; padding: 10px;">
        <label for="taskName" style="font-weight: bold;">Task Name</label>
        <input id="taskName" class="swal2-input" type="text" placeholder="Enter your task name" style="padding: 8px; border-radius: 5px; border: 1px solid #ccc;">
        
        <label for="startDate" style="font-weight: bold;">Start Date</label>
        <input id="startDate" class="swal2-input" type="date" style="padding: 8px; border-radius: 5px; border: 1px solid #ccc;">
        
        <label for="endDate" style="font-weight: bold;">End Date</label>
        <input id="endDate" class="swal2-input" type="date" style="padding: 8px; border-radius: 5px; border: 1px solid #ccc;">
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: 'Add',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#4CAF50', 
    cancelButtonColor: '#f44336', 
    preConfirm: () => {
      let taskName = (document.getElementById('taskName') as HTMLInputElement).value;
      let startDate = (document.getElementById('startDate') as HTMLInputElement).value;
      let endDate = (document.getElementById('endDate') as HTMLInputElement).value;

      if (!taskName) {
        Swal.showValidationMessage('Task name is required');
        return false;
      }

      if (!startDate) {
        Swal.showValidationMessage('Start date is required');
        return false;
      }

      if (!endDate) {
        Swal.showValidationMessage('End date is required');
        return false;
      }
      const data={
        taskName:taskName,
        startDate:startDate,
        endDate:endDate,
        userId:id,
      }
     this.s.addTask(data).subscribe(
      (response: any) => {
        this.tasks.push(response); 
        console.log('Task added successfully:', response);
      },
      (error) => {
        console.error('Error adding task:', error);
        Swal.fire('Error', 'Could not add task', 'error');
      }
     )
     
      return { taskName, startDate, endDate };
    }
  }).then((result: any) => {
    if (result.isConfirmed) {
      console.log('New Task:', result.value);
      console.log('Start Date:', result.value.startDate);
      console.log('End Date:', result.value.endDate);
      window.location.reload(); 
      
    }
  });
}

  toggleTaskOptions(task: any) {
    task.showOptions = !task.showOptions;
  }

  
  changeStatus(task: any, status: number) {
    task.status = status;
    this.s.changeStatus(task, status).subscribe(
      (response: any) => {
        console.log('Task status updated successfully:', response);
      },
      (error) => {
        console.error('Error updating task status:', error);
        Swal.fire('Error', 'Could not update task status', 'error');
      }
    );
  }





} 
