import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICar } from '../models/car';
import { CarRegisterService } from '../services/car-register.service';

@Component({
  selector: 'app-car-data',
  templateUrl: './car-data.component.html',
  styleUrls: ['./car-data.component.css']
})
export class CarDataComponent implements OnInit {

  constructor(private carServive: CarRegisterService, private router: Router) { }

  cars: ICar[] = [];

  num: number;
  length: number = 0;
  filters = {
    keyword: ''
  }

  n: number;
  pageOfItems: Array<ICar>;
  pageSize: number = 6;



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

    console.log("Inside add to cart: " + JSON.parse(localStorage.getItem('len')));
    this.length = this.carServive.cartDetails(id, this.num);

    console.log("length from storage: " + this.length);


    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/products']);

  }

  goToCart() {
    this.router.navigate(['/order-details']);
  }

  clearCart() {
    localStorage.clear();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/products']);
  }

  pageClick(pageOfItems: Array<ICar>) {
    this.pageOfItems = pageOfItems;
  }

}
