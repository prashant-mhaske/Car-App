import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IAdmin } from '../models/admin';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  adminForm: FormGroup;
  submitted: boolean = false;
  admin: IAdmin = new IAdmin();

  authRequest: any;

  response: any;
  constructor(private formBuilder: FormBuilder, private adminService: AdminService, private router: Router) {


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
    this.adminForm = this.formBuilder.group({

      userId: ['', [Validators.required]],
      password: ['', Validators.required]
    })


  }


  login(form: FormGroup) {

    let userId = this.adminForm.controls.userId.value;
    let password = this.adminForm.controls.password.value;
    // this.authRequest = {
    //   "userId": userId,
    //   "password": password
    // };

    this.adminService.SignIn(userId, password).subscribe({
      next: admin => {
        this.admin = admin;
        localStorage.setItem("adminId", JSON.stringify(this.admin.userId));
        localStorage.setItem("userId", JSON.stringify(0));
        console.log(this.admin);
        this.router.navigate(['/admin-dashboard']);
      },
      error: err => {
        alert('Invalid User Id or Passsword');
      }
    });



    console.log(`Sign in successful with ${userId} and ${password}.`);
    // alert(`Sign in successful with ${userId} and ${password}.`);

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

    // this.router.navigate(['/admin-dashboard']);
  }

}


