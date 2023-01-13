import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../home/shared/api.service';
import { ProductService } from '../../home/shared/user.service';
import { AddProductsComponent } from '../add-products/add-products.component';
import { DeleteProductComponent } from '../delete-product/delete-product.component';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent  {
  post: any;
  products: any;
  displayedColumns: string[] = ['name', 'description', 'price', 'brand', 'modelName', 'Action'];
  reactiveForm: any;
  currentProductId: any;
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(
   public readonly dialog: MatDialog,
    private apiService: ApiService,
    private toastr: ToastrService) {
     }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.apiService.getRequest('product.json').subscribe((sResponse) => {
      this.products = sResponse;

      this.products = new MatTableDataSource<any>(sResponse);
      this.products.paginator = this.paginator
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddProductsComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      this.getProducts();
    });
  }

  edit(id: number) {
    const product = this.products.find((c: { id: number; }) => c.id === id);
    const dialogRef = this.dialog.open(AddProductsComponent, {
      data: product
    });
  }

  delete(product: any) {
    let dialogControl = this.dialog.open(DeleteProductComponent);
    dialogControl.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.deleteRequest('product', product.id).subscribe((sresponse) => {
          console.log(sresponse);
          this.getProducts();
          this.toastr.success('product deleted successfully', 'Deleted')
        })}
    })
  }

}


