import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  redirectToNewPage(key:any){
    if(key=="Instagram"){
      window.open("https://www.instagram.com/aloka_herbal_earth?utm_source=qr&igsh=cnpjcXpyaXNtNjBu");
    }
    else if (key=="facebook"){
      window.open("https://www.facebook.com/share/1GB5KHV1Qf/");
    }
  }
}
