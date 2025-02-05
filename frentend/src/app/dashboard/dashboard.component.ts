import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'] 
})
export class DashboardComponent {
  pageTitle: string = 'Dashboard';
  activities: string[] = ['Swimming', 'Cycling', 'Running', 'Hiking', 'Yoga'];

  router : String = "home"

  constructor() {}

  changeRouter(newRouter : any){
    this.router = newRouter
  }

  addActivity(activity: string): void {
    this.activities.push(activity);
  }

  removeActivity(activity: string): void {
    this.activities = this.activities.filter(act => act !== activity);
  }
}
