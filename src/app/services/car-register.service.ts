import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import {ICar} from '../models/car'
import { Observable, throwError } from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CarRegisterService {

  private getUrl: string = "http://localhost:8090/Cars/GetCars";

  cartItems: number[];
  cart:any;

  dummy:number[];

  constructor(private http: HttpClient) { }

  doRegistration(car: ICar)
  {
    console.log(car);
    return this.http.post("http://localhost:8090/Cars/add",car);
    // {responseType:'text' as 'json'}
  }

  getAllCars(): Observable<ICar[]>{
    return this.http.get<ICar[]>(this.getUrl);

  }
  
  deleteCarRecord(id:number): Observable<any>{

    return this.http.delete<ICar>(`http://localhost:8090/Cars/delete/${id}`).pipe(
      tap(data => console.log('Deleted Data', JSON.stringify(data))),
      catchError(this.handleError)
    )
  }

  cartDetails(id:number,num:number):number
  {
    
    if(JSON.parse(localStorage.getItem('user'))){
      this.dummy = JSON.parse(localStorage.getItem('user'));
      this.cartItems = [];

      for(let i=0;i<this.dummy.length;i++)
      {
        this.cartItems.push(this.dummy[i]);
      }

    this.cartItems.push(id);
    console.log("Car Item length  :"+this.cartItems.length);
    localStorage.setItem('len',JSON.stringify(this.cartItems.length));
    localStorage.setItem('user',JSON.stringify(this.cartItems));
    }
    else{
      this.cartItems =new Array;
      this.cartItems.push(id);
      console.log("Car Item length  :"+this.cartItems.length);
      localStorage.setItem('len',JSON.stringify(this.cartItems.length));
      localStorage.setItem('user',JSON.stringify(this.cartItems));
    }
    return JSON.parse(localStorage.getItem('len'));
  }

  getCar(id:number):Observable<ICar>{
      return this.http.get<ICar>(`http://localhost:8090/Cars/GetCar/${id}`).pipe(
        tap(data => console.log('Car Data', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  updateCar(car: ICar){
    return this.http.put(`http://localhost:8090/Cars/update`,car);
  }

  private handleError(err: HttpErrorResponse){
    let errorMessage='';
    if(err.error instanceof ErrorEvent){
      errorMessage=`An error occured: ${err.error.message}`;
    }
    else{
      errorMessage=`Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

 }
