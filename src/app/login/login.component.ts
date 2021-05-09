
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
//import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { IAdmin } from '../models/admin';
import { ICustomer } from '../models/customer';
import { CustomerService } from '../services/customer.service';
//import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;
  customer: IAdmin = new IAdmin();

  authRequest: any;

  response: any;
  constructor(private customerService : CustomerService,private formBuilder: FormBuilder,  private router: Router) {


  }

  ngOnInit() {

    // if(localStorage.token != null && localStorage.role!=null){
    //     if(localStorage.role == 'ROLE_CUSTOMER'){
    //      this.router.navigate(["/customer"]);
    //     }
    //     else if(localStorage.role == 'ROLE_MERCHANT'){
    //        this.router.navigate(["/merchant"]);
 
    //     }
    // }
    this.loginForm = this.formBuilder.group({

      userId: ['', [Validators.required]],
      password: ['', Validators.required]
    })
    

  }


  login(form : FormGroup) {
    
    let userId = this.loginForm.controls.userId.value;
    let password = this.loginForm.controls.password.value;
    // this.authRequest = {
    //   "userId": userId,
    //   "password": password
    // };

    this.customerService.SignIn(userId,password).subscribe({
      next : customer => {
          this.customer=customer;
          localStorage.setItem("userId",JSON.stringify(this.customer.userId));
          localStorage.setItem("adminId",JSON.stringify(0));
          console.log(this.customer);
          this.router.navigate(['/products']);
      },

      error : err=> {
        alert('Invalid UserId or Password');
      }

    });
    console.log(`Sign in successful with ${userId} and ${password}.`);
    

    // let resp = this.service.generateToken(this.authRequest);
    // resp.subscribe(data => {
    //   if (data == "Invalid") {
    //     alert("Invalid username/password");
    //   } else {
    //     localStorage.token = data
    //     var decoded = jwt_decode(data);
    //     var role = decoded['jti'];
    //     localStorage.role=role;
    //     if (role == 'ROLE_CUSTOMER') {
    //       this.router.navigate(["/customer"]);
    //     }
    //     else if(role == 'ROLE_MERCHANT'){
    //       this.router.navigate(["/merchant"]);
    //     }

    //   }
    // }
   

  }

  

}