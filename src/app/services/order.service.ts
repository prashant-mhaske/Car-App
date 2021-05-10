import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {tap, catchError, map } from "rxjs/operators"
import {IOrder} from '../models/order'

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orderApi:string = "http://localhost:8090/Order/";
  order: IOrder;

  constructor(private httpClient: HttpClient) { }

  public getAllOrders(): Observable<IOrder[]> {
    return this.httpClient.get<IOrder[]>(`${this.orderApi}getAllOrders`).pipe(
      tap(data => console.log('Displaying All Orders', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  public getOrderDetails(id: number): Observable<IOrder>{
    return this.httpClient.get<IOrder>(`${this.orderApi}getOrderDetails/${id}`).pipe(
      tap(data => console.log('Displaying Order by Id', JSON.stringify(data))),
      catchError(this.handleError)
    );
  //     map(resp => resp.json())
    // );
    
  }

  public getOrdersByBillingDate(billingDate: string): Observable<IOrder[]> {
    console.log(billingDate);
    return this.httpClient.get<IOrder[]>(`${this.orderApi}GetCars/billDate/{billingDate}?billingDate=${billingDate}`).pipe(
      tap(data => console.log('Displaying Order by Date', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  public addOrder(id: number, billingDate: string,userId: number, cars: number[]): Observable<IOrder>{
    return this.httpClient.post<IOrder>(`${this.orderApi}add/${id}/{billingDate}/${userId}?billingDate=${billingDate}`, cars).pipe(
      tap(data => console.log('Order Added :', JSON.stringify(data))),
      catchError(this.handleError)
    )
  }

  // public getBill(id: number): Observable<String> {
  //   return this.httpClient.get<String>(`${this.orderApi}getBill/${id}`);
  // }

  // public setId(id:number){
  //   this.order.id = id;
  //   console.log(this.order.id);
  // }

  // public getBill(): Observable<IOrder>{
  //   return this.httpClient.get<IOrder>(`${this.orderApi}getOrderDetails/${this.order.id}`).pipe(
  //     tap(data => console.log('Displaying Bill', JSON.stringify(data))),
  //     catchError(this.handleError)
  //   );
  // }

  // public updateOrder(id: number, billingDate: string, userId: number, carId: number[]): Observable<IOrder>{
  //   return this.httpClient.put<IOrder>(`${this.orderApi}update`,[id, billingDate, userId, carId]);
  // }

  // public addOrder(order: IOrder){
  //   return this.httpClient.post(`${this.orderApi}add/${order.id}/${order.billingDate}/${order.customer.userId}`,order.car)
  // }

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