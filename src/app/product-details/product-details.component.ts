import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  quantity = 1;
  unitPrice = 900;
  totalPrice = 900;
  size: string = '250ml';
  sizeArray: any = [
    { size: '250ml', price: 900 },
    { size: '500ml', price: 1500 },
    { size: '1000ml', price: 3000 },
  ];
  isMatched: any = {};

  constructor(private http: HttpClient) {}

  increaseQty() {
    this.quantity++;
    this.updateTotalPrice();
  }

  decreaseQty() {
    if (this.quantity > 1) this.quantity--;
    this.updateTotalPrice();
  }

  onSizeChange(event: Event): void {
    let value = String((event.target as HTMLSelectElement).value);
    this.isMatched = this.sizeArray.find((x: any) => x.price == value);
    this.size = this.isMatched ? this.isMatched.size : this.size;
    this.unitPrice = this.isMatched ? this.isMatched.price : this.unitPrice;
    this.updateTotalPrice();
  }

  updateTotalPrice(): void {
    this.totalPrice = this.quantity * this.unitPrice;
  }


  onSubmit(form: NgForm) {
    if (form.invalid) return;

    const { name, email, phone, address, message } = form.value;
    let type: string = 'buy';
    let _message: any = '';
    let userInfo = {
      quantity: this.quantity,
      size: this.size,
      totalPrice: this.totalPrice,
      address: address,
    };
    _message = `Hi my name is ${name}\nI want Aloka Herbal Earth oil\n My order details are as:\nQuantity: ${userInfo.quantity} / ${userInfo.size}\nTotal price: ${userInfo.totalPrice}/-\nPhone no:${phone}\nAddress: ${userInfo.address}`;
    // 1. Send Email via EmailJS
    emailjs
      .send(
        'service_s68lc7e',
        'template_3zwp4eb',
        {
          name: `${name}`,
          title: `Order for Aloka Herbal Earth`, // pass name from form
          message: `${_message}`, // custom formatted message
        },
        'mfHdqYCxdHvNZilBu'
      )
      .then(() => {
        alert('Request sent successfully!');

        // Encode message for URL
        const encodedMessage = encodeURIComponent(_message);

        // Replace with your WhatsApp business/personal number
        const phoneNumber = '916363298244';

        window.location.href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        // 2. Send WhatsApp message via backend
        // this.http.post('http://localhost:3000/send-whatsapp', { name, phone , type , userInfo})
        //   .subscribe({
        //     next: (res: any) => {
        //       console.log('Successfully placed an order soon we will reach to you.:', res);
        //       alert('!');
        //     },
        //     error: (err) => {
        //       console.error('Successfully placed an order please enter valid WhatsApp number:', err);
        //     }
        //   });

        form.resetForm();
      });
  }
}
