import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login.component';
import { SharedModule } from '../../shared.module';

const routes: Routes = [
  { path: '', component: LoginComponent }, // Default route for this module
];

@NgModule({
  declarations: [LoginComponent],
  imports: [RouterModule.forChild(routes), SharedModule],
})
export class LoginModule {}
