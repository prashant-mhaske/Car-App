import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ICard } from '../models/card';
import { IPayment } from '../models/payment';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  paymentForm: FormGroup;
  payment: IPayment = new IPayment();
  orderId: number;

  constructor(private formBuilder: FormBuilder, private paymentService: PaymentService, private router: Router) {
    this.paymentForm = this.formBuilder.group({
      name: ['', Validators.required],
      number: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      // expiry: '',
      month: ['', Validators.required],
      year: ['', Validators.required],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
    });
  }

  onSubmit(form: FormGroup) {
    console.log('In onSubmit()');
    // this.payment.card=form.value;
    this.payment.card = new ICard();
    this.payment.card.name = form.get('name').value;
    this.payment.card.number = form.get('number').value;
    this.payment.card.cvv = form.get('cvv').value;
    this.payment.card.expiry = `${form.get('year').value}-${form.get('month').value}-01`
    this.payment.id = 101;
    this.payment.status = "Successful";
    this.payment.type = "Debit Card";
    console.log(this.payment);
    this.paymentService.addPAyment(this.payment).subscribe({
      next: data => {
        console.log('Payment Successful', data);
        
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Payment successful for Order Id ' + this.orderId,
          timerProgressBar: true,
          showConfirmButton: false,
          timer: 2000,
          didOpen: () => {
            
          },
          willClose: () => {
            this.router.navigateByUrl('/bill-details', { state: { id: this.orderId } });
          }
        });
        // this.router.navigateByUrl('/bill-details', { state: { id: this.orderId } });
      }
    });
    this.paymentForm.reset();
  }

  ngOnInit(): void {
    if (!localStorage.getItem('foo')) {
      localStorage.setItem('foo', 'no reload')
      location.reload()
    } else {
      localStorage.removeItem('foo')
    }
    this.orderId = JSON.parse(localStorage.getItem('orderId'));
  }

}
