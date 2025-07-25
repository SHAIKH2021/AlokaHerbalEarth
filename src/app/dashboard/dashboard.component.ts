import { Component } from '@angular/core';
import { ProductDetailsComponent } from "../product-details/product-details.component";
import { ProductsComponent } from "../products/products.component";
import { ContactComponent } from "../contact/contact.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ProductDetailsComponent, ProductsComponent, ContactComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
