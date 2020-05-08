import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { DashboardComponent } from './dashboard/dashboard.component'
import { UsersComponent } from './users/users.component';
import { AdminComponent } from './admin.component';
import { AuthenticateGuard } from '../guards/authenticate.guard';
import { AdminGuard } from '../guards/admin.guard';
 
const routes: Routes = [
    {   
        path: 'admin', component: AdminComponent, canActivate: [AuthenticateGuard, AdminGuard],
        children :[
            { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
            { path: 'dashboard', component: DashboardComponent},
            { path: 'users', component: UsersComponent}
        ]
    },
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }