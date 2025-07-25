import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  constructor(private router:Router){}

  redirectToPage(){
    this.router.navigate(['/productDetails']);
  }
}
