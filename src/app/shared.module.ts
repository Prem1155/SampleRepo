import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';



@NgModule({

imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    MatPaginatorModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      toastClass: 'ngx-toastr custom-toast',
      positionClass: 'toast-top-right',
      preventDuplicates: false,
      autoDismiss: false,
      newestOnTop: true,
    }),
  ],
  exports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    MatPaginatorModule,
    ToastrModule
  ]
})
export class SharedModule { }
