import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICustomer } from '../models/customer';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  carOpen:boolean= false;
  userId: number;
  adminId: number;
  customerName: string;
  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {
    this.carOpen= false;
    this.userId=JSON.parse(localStorage.getItem("userId"));
    this.adminId=JSON.parse(localStorage.getItem("adminId"));

    if(this.userId){
      this.customerService.getCustomer(this.userId).subscribe({
        next: customer =>{
          this.customerName=customer.name;
        }
      })
    }
  }

  logout(){
    localStorage.setItem("userId", JSON.stringify(0));
    localStorage.setItem("adminId", JSON.stringify(0));
    this.router.navigate(['/home']);
  }

  isCarOpen(){
    this.carOpen= true;
  }



}
