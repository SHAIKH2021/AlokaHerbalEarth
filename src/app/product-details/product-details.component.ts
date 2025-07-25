import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule , NgForm} from '@angular/forms';
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

  constructor(private http:HttpClient){};

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
    this.size= value;
    this.isMatched = this.sizeArray.find((x: any) => x.size == value);
    this.unitPrice = this.isMatched ? this.isMatched.price : this.unitPrice;
    this.updateTotalPrice();
  }

  updateTotalPrice(): void {
    this.totalPrice = this.quantity * this.unitPrice;
  }

  sendWhatsAppMessage(): void {
    const phoneNumber = '917738604742';
    const message = encodeURIComponent(
      `Hello! I want to buy aloka herbal oil's ${this.quantity} bottel of ${this.isMatched.size} size with ${this.totalPrice} ruppes details about me is as : `
    );
    const url = `https://wa.me/${phoneNumber}?text=${message}`;

    window.open(url, '_blank');
  }

  onSubmit(form: NgForm) {
      if (form.invalid) return;

      const { name, email, phone, address , message} = form.value;
      let type : string = "buy";
      // 1. Send Email via EmailJS
      emailjs.send('service_s68lc7e', 'template_3zwp4eb', form.value, 'mfHdqYCxdHvNZilBu')
        .then(() => {
          alert('Request sent successfully!');

          let userInfo = { quantity : this.quantity, size : this.size, totalPrice : this.totalPrice , address : address }

          // 2. Send WhatsApp message via backend
          this.http.post('http://localhost:3000/send-whatsapp', { name, phone , type , userInfo})
            .subscribe({
              next: (res: any) => {
                console.log('Successfully placed an order soon we will reach to you.:', res);
                alert('!');
              },
              error: (err) => {
                console.error('Successfully placed an order please enter valid WhatsApp number:', err);
              }
            });

          form.resetForm();
        });
    }
}
