import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin.routing.module';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatListModule } from '@angular/material/list'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatTableModule } from '@angular/material/table'
import { MatDialogModule } from '@angular/material/dialog'
import { ChartsModule } from 'ng2-charts'

import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { DialogCompComponent } from './dialog-comp/dialog-comp.component';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { DoughnutChartComponent } from './charts/doughnut-chart/doughnut-chart.component';




@NgModule({
  declarations: [
    UsersComponent, 
    AdminComponent,
    UsersComponent,
    DashboardComponent,
    AdminHeaderComponent,
    AdminSidebarComponent,
    DialogCompComponent,
    BarChartComponent,
    DoughnutChartComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    ChartsModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  exports:[
    AdminComponent,
    UsersComponent,
    
    AdminHeaderComponent
  ],
  entryComponents: [
    DialogCompComponent
  ]
})
export class AdminModule { }
