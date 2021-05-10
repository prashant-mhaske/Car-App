import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { ICard } from '../models/card';
import { IPayment } from '../models/payment';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-order',
  templateUrl: './payment.admin.component.html',
  styleUrls: ['./payment.admin.component.css']
})
export class PaymentAdminComponent implements OnInit {

  openForm: number = null;
  getByIdForm: FormGroup;
  getAllForm: FormGroup;
  delForm: FormGroup;
  updateForm: FormGroup;

  constructor(private paymentService: PaymentService, private formBuilder: FormBuilder) {
    this.getByIdForm = this.formBuilder.group({
      paymentId: ['', Validators.required]
    });

    this.getAllForm = this.formBuilder.group({

    });

    this.delForm = this.formBuilder.group({
      paymentId: ['', Validators.required]
    });

    this.updateForm = this.formBuilder.group({
      paymentId: ['', Validators.required],
      status: ['', Validators.required],
      type: ['', Validators.required],
      name: ['', Validators.required],
      number: ['', Validators.required],
      expiry: ['', Validators.required],
      cvv: ['', Validators.required]
    })
  }
  sub!: Subscription;
  payment: IPayment;
  payments: IPayment[] = [];
  delete: IPayment;
  update: IPayment = new IPayment();
  click(name: number) {
    this.openForm = name;
  }

  paymentById(form: FormGroup) {
    const id=form.value.paymentId;
    this.sub = this.paymentService.getPaymentById(form.value.paymentId).subscribe({
      next: payment => {
        this.payment = payment;
      },
      error: err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops',
          text: 'No Payment with Payment id '+id+' found !'
        })
      }
    });
    this.getByIdForm.reset();
    this.openForm = 2;
  }

  updatePayment(form: FormGroup) {
    this.update.id = form.get('paymentId').value;
    this.update.status = form.get('status').value;
    this.update.type = form.get('type').value;
    this.update.card = new ICard();
    this.update.card.name = form.get('name').value;
    this.update.card.number = form.get('number').value;
    this.update.card.expiry = form.get('expiry').value;
    this.update.card.cvv = form.get('cvv').value;
    this.sub = this.paymentService.updatePayment(this.update).subscribe(data => {
      console.log("Data Updated")
    },
      error => {
        console.log(error);
      }
    );
  }

  delById(form: FormGroup) {
    this.sub = this.paymentService.deletePayment(form.value.paymentId).subscribe({
      next: payment => {
        this.delete = payment;
      }
    });
    this.delForm.reset();
    this.openForm = 4;
  }

  allPayment(form: FormGroup) {
    this.sub = this.paymentService.getAllPayment().subscribe({
      next: payments => {
        this.payments = payments;
      }
    });
    this.getAllForm.reset();
    this.openForm = 1;
  }

  ngOnInit(): void {
  }

}
