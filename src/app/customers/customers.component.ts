import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../service.service';
import { usermodel } from '../model';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  finalize,
  of,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css',
})
export class CustomersComponent implements OnInit {
  searchtext: any;
  length: any;
  pageindex: any;
  pagesizenumber: any;
  getalldetails: any[] = [];

  loading: any = false;
  noDataFound: any = false;

  private SearchContent = new BehaviorSubject<any>('');
  pagination = new BehaviorSubject<{ pageIndex: any; pageSize: any }>({
    pageIndex: 0,
    pageSize: 10,
  });
  private destory: any = new Subject<void>();

  constructor(public toastr: ToastrService, public service: ServiceService) {

  }

  ngOnInit(): void {
    combineLatest([this.SearchContent, this.pagination])
      .pipe(
        tap(() => {
          this.loading = true; // Show spinner immediately
          this.noDataFound = false; // Reset table state
        }),
        debounceTime(500),
        distinctUntilChanged(
          ([prevSearch, prevPage], [currSearch, currPage]) =>
            prevSearch === currSearch &&
            prevPage.pageIndex === currPage.pageIndex &&
            prevPage.pageSize === currPage.pageSize
        ),
        switchMap(([search, page]: [any, any]) => {
          let submitmodel: usermodel = {
            pageIndex: page.pageIndex,
            pagesize: page.pageSize,
            search: search?.trim() || null,
          };
          this.loading = true;
          this.noDataFound = false;
          return this.service.viewallUserDetails(submitmodel).pipe(
            catchError((err) => {
              this.toastr.error('Something went wrong.', err?.message);
              return of(null); // Return empty observable so stream continues
            }),
            finalize(() => {
              this.loading = false; // Hide spinner after API completes
            })
          );
        }),
        takeUntil(this.destory)
      )
      .subscribe({
        next: (res: any) => {
          this.getalldetails = res?.content?.content;
          this.length = res?.content?.totalElements;
          this.pageindex = res?.content?.pageable?.pageNumber;
          this.pagesizenumber = res?.content?.pageable?.pageSize;
          if (res?.flag == 2) {
            this.noDataFound = true;
          } else {
            this.noDataFound = false;
          }
          // this.loading == res?.content?.content?.length != 0 ? true: false;
        },
        error: (err: any) => {
          this.toastr.error('Something went wrong');
        },
      });
    this.SearchContent.next(''); // empty search as default
  }

  searchfilter() {
    this.SearchContent.next(this.searchtext?.trim());
  }

  onSearchChange(e: any) {
    const value = (e.target as HTMLInputElement).value;
    console.log(value);

    this.SearchContent.next(value);
  }

  getdatapage(event: any) {
    this.pagination.next({
      pageIndex: event.pageIndex,
      pageSize: event.pageSize,
    });
  }

  ngOnDestroy() {
    this.destory.next();
    this.destory.complete();
  }

  success(){
    this.toastr.show("success");
  }
}
