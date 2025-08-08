import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  constructor(private http: HttpClient) {}

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    const { name, email, phone, message } = form.value;
    let type: string = 'contact';
    // 1. Send Email via EmailJS
    emailjs
      .send(
        'service_s68lc7e',
        'template_3zwp4eb',
        {
          name: `${name}`,
          title: `Aloka herbal earth message from ${name}`, // pass name from form
          message: `${message}`, // custom formatted message
        },
        'mfHdqYCxdHvNZilBu'
      )
      .then(() => {
        alert('Request sent successfully!');

        let val = `Hi ! ${message}`;

        // Encode message for URL
        const encodedMessage = encodeURIComponent(val);

        // Replace with your WhatsApp business/personal number
        const phoneNumber = '916363298244';

        // Redirect to WhatsApp
        window.location.href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        // 2. Send WhatsApp message via backend
        // this.http.post('http://localhost:3000/send-whatsapp', { name, phone, type })
        //   .subscribe({
        //     next: (res: any) => {
        //       console.log('Request send on WhatsApp');
        //     },
        //     error: (err) => {
        //       console.error('please enter valid WhatsApp number', err);
        //     }
        //   });

        form.resetForm();
      });
  }
}
