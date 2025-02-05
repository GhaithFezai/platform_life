import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.css'] 
})
export class CalendrierComponent implements OnInit {
  tasks: any[] = []; 
  todoCount: number = 0;
  inProgressCount: number = 0;
  reviewCount: number = 0;
  doneCount: number = 0;

  constructor(private http: HttpClient, private router: Router , private s: ServiceService) {}

  ngOnInit(): void {
    this.getTasks(); 
  }

  getTasks(): void {
    const id = localStorage.getItem('id');
    this.s.getTasks().subscribe(
      (response: any) => {
        console.log('Tasks retrieved:', response);
        this.tasks = response; 
        this.calculateStatistics();
      },
      (error) => {
        console.error('Error retrieving tasks:', error);
        Swal.fire('Error', 'Could not fetch tasks', 'error');
      }
    );
  }

  calculateStatistics(): void {
    this.todoCount = this.tasks.filter(task => task.status === 1).length;
    this.inProgressCount = this.tasks.filter(task => task.status === 2).length;
    this.reviewCount = this.tasks.filter(task => task.status === 3).length;
    this.doneCount = this.tasks.filter(task => task.status === 4).length;

  }
}
