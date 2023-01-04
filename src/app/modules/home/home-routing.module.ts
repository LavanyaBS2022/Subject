import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullLayoutComponent } from 'src/app/layouts/full-layout/full-layout.component';
import { HomeComponent } from './home.component';

const routes: Routes = [{ path: '', component: FullLayoutComponent,
children:[
  {
    path:'',
    component:HomeComponent
  }
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
