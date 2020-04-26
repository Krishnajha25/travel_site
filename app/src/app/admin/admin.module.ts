import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin.routing.module';


import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';




@NgModule({
  declarations: [
    UsersComponent, 
    AdminComponent,
    
    UsersComponent,
    DashboardComponent,
    AdminHeaderComponent,
    AdminSidebarComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
  ],
  exports:[
    AdminComponent,
    UsersComponent,
    
    AdminHeaderComponent
  ]
})
export class AdminModule { }
