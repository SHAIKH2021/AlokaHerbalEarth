import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  constructor(private http: HttpClient) {}

  // const serviceID = 'service_s68lc7e';
  // const templateID = 'template_3zwp4eb';
  // const publicKey = 'mfHdqYCxdHvNZilBu';

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    const { name, email, phone, message } = form.value;
    let type: string = "contact"
    // 1. Send Email via EmailJS
    emailjs.send('service_s68lc7e', 'template_3zwp4eb', form.value, 'mfHdqYCxdHvNZilBu')
      .then(() => {
        alert('Request sent successfully!');

        // 2. Send WhatsApp message via backend
        this.http.post('http://localhost:3000/send-whatsapp', { name, phone, type })
          .subscribe({
            next: (res: any) => {
              console.log('Request send on WhatsApp');
            },
            error: (err) => {
              console.error('please enter valid WhatsApp number', err);
            }
          });

        form.resetForm();
      });
  }
}
