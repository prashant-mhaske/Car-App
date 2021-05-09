import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.dashboard.component.html',
  styleUrls: ['./admin.dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  constructor(private router: Router) { }


  userId = JSON.parse(localStorage.getItem("adminId"));
  ngOnInit(): void {
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }
    
  }

}
