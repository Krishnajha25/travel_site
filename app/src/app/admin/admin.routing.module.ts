import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 
import { DashboardComponent } from './dashboard/dashboard.component'
import { UsersComponent } from './users/users.component';
import { AdminComponent } from './admin.component';
 
const routes: Routes = [
    {   path: 'admin', component: AdminComponent,
        children :[
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