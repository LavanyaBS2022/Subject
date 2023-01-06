import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductService } from '../../home/shared/user.service';


@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})

export class ListProductComponent {
  products: any;
  constructor(private productService: ProductService,
    private router: Router, public dialog:MatDialog) {
    this.products = productService.getProduct();
  }
 openDialog(){
  const dialogRef=this.dialog.open(AddProductComponent);
  dialogRef.afterClosed().subscribe(result=>{
    console.log('Dialog result :${result}');
  });
 }
}

export class AddProductComponent {

}
