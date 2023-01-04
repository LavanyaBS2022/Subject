import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullLayoutComponent } from 'src/app/layouts/full-layout/full-layout.component';
import { DetailsComponent } from './details.component';

const routes: Routes = [{
  path: '', component: FullLayoutComponent,
  children: [{
    path: ':id',
    component: DetailsComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsRoutingModule { }
