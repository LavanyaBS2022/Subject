import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from 'src/app/modules/home/shared/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  // providers: [ProductService]
})
export class HeaderComponent implements OnInit {
  @Input() snav: any;
  cartCount = 0;
  constructor(private productService: ProductService) {
    // this.cartCount=productService.cartCount;
  }
  ngOnInit(): void {
    // this.productService.subject$.subscribe(val=>{
    // this.cartCount=val;
    // });
    this.productService.subject$.subscribe(val => {
      debugger;
      this.cartCount = val;
    })
  }
}
