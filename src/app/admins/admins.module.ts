import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminsComponent } from './admins.component';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  { path: '', component: AdminsComponent }  // Default route for this module
];

@NgModule({
  declarations: [AdminsComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AdminsModule { }
