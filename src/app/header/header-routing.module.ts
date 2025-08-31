import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header.component';

const routes: Routes = [
  {
    path: '',
    component: HeaderComponent,
    children: [
      {
        path: 'customers',
        loadChildren: () =>
          import('../customers/customers.module').then(m => m.CustomersModule),
      },
      {
        path: 'admins',
        loadChildren: () =>
          import('../admins/admins.module').then(m => m.AdminsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeaderRoutingModule { }
