import { Component } from '@angular/core';
import { ProductService } from './shared/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  // providers:[ProductService]
})
export class HomeComponent {
  opened=false;
  users:any;

  constructor(private productService: ProductService){
    this.users=this.productService.getProduct();
  }

}
