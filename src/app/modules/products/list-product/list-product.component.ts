import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../home/shared/api.service';
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
    this.getProductDetails();
  }

  getProductDetails() {
    this.apiService.getRequest('/products').subscribe((sResponse) => {
      this.products = sResponse.data;

      this.products = new MatTableDataSource<any>(sResponse.data);
      this.products.paginator = this.paginator;
    })
  }

  openFormDialog() {
    const dialogRef = this.dialog.open(AddProductsComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      this.getProductDetails();
    });
  }

  // editProductDetails(id: number) {
  //   const product = this.products.find((c: { id: number; }) => c.id === id);
  //   const dialogRef = this.dialog.open(AddProductsComponent, {
  //     data: product,
  //   });
  //   return dialogRef;
  // }

  editProductDetails(product: any) {
    debugger
    const dialogRef = this.dialog.open(AddProductsComponent,{data:{products:product}});
    dialogRef.afterClosed().subscribe((event) =>{
      debugger;
      if(event=="Updated"){
        this.getProductDetails();
      }
      else{
        console.log("No new Updates");
      }
    });
  }


  deleteProduct(product: any) {
    let dialogControl = this.dialog.open(DeleteProductComponent);
    dialogControl.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.deleteRequest('/products', product.id).subscribe((sresponse) => {
          this.getProductDetails();
          this.toastr.success('product deleted successfully', 'Deleted')
        })}
    })
  }

}


