import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'shared/shared.module';
import { DataTableModule } from 'angular5-data-table';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from 'shared/services/auth-guard.service';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';



@NgModule({
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent
    
  ],
  exports:[AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent],
  providers:[AdminAuthGuardService],
  imports: [
    
    SharedModule,
    RouterModule.forChild([

     
      {path:'admin/products/new', 
      component:ProductFormComponent, canActivate: [AuthGuardService,AdminAuthGuardService]},
  
      {path:'admin/products/:id',
      component:ProductFormComponent, canActivate: [AuthGuardService,AdminAuthGuardService]},
  
      {path:'admin/products', 
      component:AdminProductsComponent, canActivate: [AuthGuardService,AdminAuthGuardService]},
    
  
      {path:'admin/orders', 
      component:AdminOrdersComponent, canActivate: [AuthGuardService,AdminAuthGuardService]}
      
  
      ]),
  ]
})
export class AdminModule { }
