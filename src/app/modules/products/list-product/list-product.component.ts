import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../home/shared/api.service';
import { ProductService } from '../../home/shared/user.service';
import { AddProductsComponent } from '../add-products/add-products.component';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent {
  post: any;
  products: any;
  dataSource: any;
  displayedColumns: string[] = ['name', 'description', 'price', 'edit', 'delete'];
  reactiveForm: any;
  currentProductId: any;

  constructor(private productService: ProductService,
    private router: Router, public dialog: MatDialog, private apiService: ApiService, private toastr: ToastrService) {
    // this.products = productService.getProduct();
    // this.dataSource = this.products;
  }

  ngOnInit() {
    this.getProducts();
  }

  onSubmitClick(post: any) {
    this.post = post;
    this.apiService.postRequest('product.json', this.post).subscribe((sresponse) => {
      console.log(sresponse);
      this.getProducts();
    })
  }
  getProducts() {
    debugger;
    this.apiService.getRequest('product.json').subscribe((sResponse) => {
      this.products = sResponse;
    }, error => {
      this.toastr.error('Something went wrong', 'please try later')
    }
    )
  }
  openDialog() {
    const dialogRef = this.dialog.open(AddProductsComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.getProducts();
      console.log('Dialog result :${result}');
    });
  }
  delete(product: any) {
    this.apiService.deleteRequest('product', product.id).subscribe((sresponse) => {
      this.toastr.success('product deleted successfully')
      console.log(sresponse);
      this.getProducts();
    })
  }
}


