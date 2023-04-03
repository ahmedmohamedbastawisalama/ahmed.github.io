import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor(
    private datePipe: DatePipe,
    private toastr: ToastrService

  ) { }

  currentDate() {
    return this.datePipe.transform(new Date(), 'yyyy-MM-dd h:mm:ss');
  }

  currentDateOnly() {
    return this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  transformDate(date: string | number | Date, sequence = 'MMM dd, yyyy') {
    // MySql format - 'y-MM-dd'
    return this.datePipe.transform(date, sequence);
  }

  presentAlert(title: string | undefined, message = '') {
    this.toastr.success(title, message);

  }

  presentAlertError(title: string | undefined, message = '') {
    this.toastr.error(title, message);

  }

  presentAlertInfo(title: string | undefined, message = '') {
    this.toastr.info(title, message);
  }

  presentConfirm(fn: (arg0: boolean) => void, title: any, message = '') {
    // Swal.fire({
    //   title: title,
    //   text: message,
    //   icon: 'warning',
    //   showCancelButton: true
    // }).then((result) => {
    //   if (result.value) {
    //     fn(true)
    //   } else if (result.dismiss === Swal.DismissReason.cancel) {
    //     fn(false)
    //   }
    // })
  }
}