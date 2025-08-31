import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers.component';
import { FormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';

const routes: Routes = [
  { path: '', component: CustomersComponent }  // Default route for this module
];

@NgModule({
  declarations: [CustomersComponent],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule,MatPaginatorModule],
})
export class CustomersModule { }
