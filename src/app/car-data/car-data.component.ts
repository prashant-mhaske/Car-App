import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ICar } from '../models/car';
import { CarRegisterService } from '../services/car-register.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-car-data',
  templateUrl: './car-data.component.html',
  styleUrls: ['./car-data.component.css']
})
export class CarDataComponent implements OnInit {

  constructor(private carServive: CarRegisterService, private router: Router) { }

  cars: ICar[] = [];
  // selectedCars: ICar[] = [];
  // totalCartItems:number;
  num: number;// = JSON.parse(localStorage.getItem('len'));
  length: number = 0;
  filters = {
    keyword: ''
  }

  n: number;
  pageOfItems: Array<ICar>;
  pageSize: number = 6;

  //   {
  //     "id": 190,
  //     "brand": "Mercedes",
  //     "model": "Benz",
  //     "color": "Black",
  //       
  //     "variant": "Recent",
  //     "price": 1200000,
  //     "registrationYear": "2021-03-12",
  //     "registrationState": "WB"
  //   },
  //    {
  //     "id": 191,
  //     "brand": "Honda",
  //     "model": "City",
  //     "color": "Black",
  //     "variant": "New",
  //     "price": 600000,
  //     "registrationYear": "2020-09-16",
  //     "registrationState": "WB"
  //   },
  //   {
  //     "id": 192,
  //     "brand": "Honda",
  //     "model": "Civic",
  //     "color": "Brown",
  //     "variant": "New",
  //     "price": 400000,
  //     "registrationYear": "2019-04-10",
  //     "registrationState": "MH"
  //   },
  //   {
  //     "id": 225,
  //     "brand": "Honda",
  //     "model": "City",
  //     "color": "Black",
  //     "variant": "Vxi",
  //     "price": 25.5,
  //     "registrationYear": "2021-12-12",
  //     "registrationState": "Maharashtra"
  //   },
  //   {
  //     "id": 250,
  //     "brand": "Tata",
  //     "model": "Safari",
  //     "color": "Black",
  //     "variant": "Vxi",
  //     "price": 15.5,
  //     "registrationYear": "2020-12-12",
  //     "registrationState": "Maharashtra"
  //   }
  // ]

  ngOnInit(): void {
    if (!localStorage.getItem('foo')) {
      localStorage.setItem('foo', 'no reload')
      location.reload()
    } else {
      localStorage.removeItem('foo')
    }
    this.carServive.getAllCars().subscribe(data => this.cars = data);
    this.num = JSON.parse(localStorage.getItem('len'));
    // console.log(this.num);
    this.n = JSON.parse(localStorage.getItem('len'));
  }

  carList() {
    this.carServive.getAllCars().subscribe(
      data => {
        this.cars = this.filterCars(data);

      });

  }

  filterCars(cars: ICar[]) {
    return cars.filter((c) => {
      return c.brand.toLocaleLowerCase().includes(this.filters.keyword.toLocaleLowerCase())
        || c.model.toLocaleLowerCase().includes(this.filters.keyword.toLocaleLowerCase())
        || c.color.toLocaleLowerCase().includes(this.filters.keyword.toLocaleLowerCase());
    })
  }

  addToCart(id: number) {
    // console.log(JSON.parse(localStorage.getItem('len')));
    // this.carServive.cartDetails(car).sub

    console.log("Inside add to cart: " + JSON.parse(localStorage.getItem('len')));
    this.length = this.carServive.cartDetails(id, this.num);
    // console.log("length from storage:"+JSON.parse(localStorage.getItem('len')));
    console.log("length from storage: " + this.length);
    // this.length+=this.num;

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/products']);

  }

  goToCart() {
    const userId = JSON.parse(localStorage.getItem('userId'))
    if (!userId) {
      localStorage.removeItem('len');
      localStorage.removeItem('user');
      Swal.fire({
        icon: 'error',
        title: 'User Not Logged In...',
        text: 'Please Login to place an order'
      });
      this.router.navigate(['/login']);
    }
    else {
      this.router.navigate(['/order-details']);
    }
  }

  clearCart() {
    // localStorage.clear();
    localStorage.removeItem('len');
    localStorage.removeItem('user')
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/products']);
  }

  pageClick(pageOfItems: Array<ICar>) {
    this.pageOfItems = pageOfItems;
  }

}
