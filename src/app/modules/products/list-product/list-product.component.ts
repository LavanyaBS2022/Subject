import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductService } from '../../home/shared/user.service';
import { AddProductsComponent } from '../add-products/add-products.component';


@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})


export class ListProductComponent {

  products: any;
  dataSource:any;
  displayedColumns: string[] = ['id', 'name', 'description', 'price'];

  constructor(private productService: ProductService,
    private router: Router, public dialog:MatDialog) {
    this.products = productService.getProduct();
    this.dataSource = this.products;
  }


 openDialog(){
  const dialogRef=this.dialog.open(AddProductsComponent);
  dialogRef.afterClosed().subscribe(result=>{
    console.log('Dialog result :${result}');
  });
 }
}


