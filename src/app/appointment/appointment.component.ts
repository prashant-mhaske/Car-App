import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IAppointment } from '../models/appointment';
import { ICustomer } from '../models/customer';
import { IPayment } from '../models/payment';
import { AppointmentService } from '../services/appointment.service';
import { CustomerService } from '../services/customer.service';
import { PaymentService } from '../services/payment.service';


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  userForm: FormGroup;
  appointmentForm: FormGroup;
  cancelForm: FormGroup;
  updateForm: FormGroup;
  openForm: number = null;
  delete: IAppointment;
  app: IAppointment;
  appointment: IAppointment = new IAppointment();

  constructor(private appointmentService: AppointmentService, private paymentService: PaymentService, private customerService: CustomerService, private formBuilder: FormBuilder) {

    this.userForm = this.formBuilder.group({

      custId: ['', Validators.required],
      location: ['', Validators.required],
      inspectionType: ['', Validators.required],
      preferredDate: ['', Validators.required],
      preferredTime: ['', Validators.required],
      payId: ['', Validators.required]
    });

    this.updateForm = this.formBuilder.group({
      id: ['', Validators.required],
      custId: ['', Validators.required],
      location: ['', Validators.required],
      inspectionType: ['', Validators.required],
      preferredDate: ['', Validators.required],
      preferredTime: ['', Validators.required],
      payId: ['', Validators.required]
    });

    this.cancelForm = this.formBuilder.group({
      id: ['', Validators.required]
    });

    this.appointmentForm = this.formBuilder.group({
      id: ['', Validators.required]
    });
  }


  onSubmit(form: FormGroup) {

    let id: number = 11;
    let custId = this.userForm.controls.custId.value;
    let location = this.userForm.controls.location.value;
    let inspectionType = this.userForm.controls.inspectionType.value;
    let preferredDate = this.userForm.controls.preferredDate.value;
    let preferredTime = this.userForm.controls.preferredTime.value;
    let payId = this.userForm.controls.payId.value;

    this.appointmentService.addAppointment(id, location, inspectionType, preferredDate, preferredTime, custId, payId).subscribe((data) => {
      console.log("Form submitted.");
      alert(`Appointment booked successfully.`);
      this.userForm.reset();
    });
  }

  onView(form: FormGroup) {
    this.appointmentService.getAppointmentById(form.value.id).subscribe({
      next: appointment => {
        this.app = appointment;
      }
    });
    this.appointmentForm.reset();
    this.openForm = 3;

  }

  onCancel(form: FormGroup) {
    this.appointmentService.deleteAppointment(form.value.id).subscribe({
      next: appointment => {
        this.delete = appointment;

      }
    });
    this.cancelForm.reset();
    this.openForm = 4;
  }

  onUpdate(form: FormGroup) {

    let id = this.updateForm.controls.id.value;
    let custId = this.updateForm.controls.custId.value;
    let location = this.updateForm.controls.location.value;
    let inspectionType = this.updateForm.controls.inspectionType.value;
    let preferredDate = this.updateForm.controls.preferredDate.value;
    let preferredTime = this.updateForm.controls.preferredTime.value;
    let payId = this.updateForm.controls.payId.value;

    this.appointmentService.updateAppointment(id, location, inspectionType, preferredDate, preferredTime, custId, payId).subscribe((data) => {
      console.log("Form submitted.");
      alert(`Appointment Updated successfully.`);
      this.updateForm.reset();
    });

  }

  ngOnInit(): void {

  }

  click(input: number) {
    this.openForm = input;
  }






}
