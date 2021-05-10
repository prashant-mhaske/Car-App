import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ICar } from '../models/car';
import { CarRegisterService } from '../services/car-register.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  carUpdateForm: FormGroup;
  carDetailForm: FormGroup;
  carDeleteForm: FormGroup;
  carAddForm: FormGroup;

  openForm: number = null;
  car: ICar;
  updateCar: ICar = new ICar;
  addCar: ICar = new ICar;
  sub!: Subscription;

  constructor(private carService: CarRegisterService, private router: Router, private formBuilder: FormBuilder) {
    this.carUpdateForm = this.formBuilder.group({
      id: ['', [Validators.required, Validators.minLength(3)]],
      brand: ['', [Validators.required, Validators.minLength(3)]],
      model: ['', [Validators.required, Validators.minLength(3)]],
      color: ['', [Validators.required, Validators.minLength(3)]],
      variant: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(4)]],
      registrationYear: ['', [Validators.required, Validators.minLength(4)]],
      registrationState: ['', [Validators.required, Validators.minLength(3)]]
    });

    this.carDetailForm = this.formBuilder.group({
      id: ['', [Validators.required]]
    });

    this.carDeleteForm = this.formBuilder.group({
      id: ['', [Validators.required]]
    });

    this.carAddForm = this.formBuilder.group({
      id: [''],
      brand: ['', [Validators.required, Validators.minLength(3)]],
      model: ['', [Validators.required, Validators.minLength(3)]],
      color: ['', [Validators.required, Validators.minLength(3)]],
      variant: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(4)]],
      registrationYear: ['', [Validators.required, Validators.min(3)]],
      registrationState: ['', [Validators.required, Validators.min(3)]]
    });


  }

  ngOnInit(): void {
  }

  click(num: number) {
    this.openForm = num;
  }

  getCarById(form: FormGroup) {
    this.sub = this.carService.getCar(form.value.id).subscribe({
      next: car => {
        this.car = car;
      }
    });
    this.carDetailForm.reset();
  }

  updateCarInfo(form: FormGroup) {
    this.updateCar.id = form.get('id').value;
    this.updateCar.brand = form.get('brand').value;
    this.updateCar.model = form.get('model').value;
    this.updateCar.color = form.get('color').value;
    this.updateCar.variant = form.get('variant').value;
    this.updateCar.price = form.get('price').value;
    this.updateCar.registrationYear = form.get('registrationYear').value;
    this.updateCar.registrationState = form.get('registrationState').value;
    this.carService.updateCar(this.addCar).subscribe(data => {
      console.log("Data Updated");
    });
    this.router.navigateByUrl("/products");
  }

  deleteCarInfo(form: FormGroup) {
    this.sub = this.carService.deleteCarRecord(form.value.id).subscribe(data => {
      console.log("Car Delete");
    });
    this.carDeleteForm.reset();
  }

  addCarInfo(form: FormGroup) {
    
    this.carService.doRegistration(form.value).subscribe(data =>{

      console.log("Data");
    },
    error=>{
      console.log(error);
    }
    );
    this.carAddForm.reset();
  }
}


