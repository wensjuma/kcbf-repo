import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ToasterAlertService {
  constructor(
    private toastrService: ToastrService
  ) { }
   successAlerts(message:string){
     this.toastrService.success(message, "Success!")
  }
   errorAlerts(message:string){
     this.toastrService.error(message, "Error!")
  }
  public handleErrors(result: any): any {
    let isValidationError = false;
    let errorMessage;
      //  this.toastrService.error('Encountered an error', 'Error');
        switch (result.responseCode) {
          case '11':
            // errorMessage = 'Wrong method';
            this.toastrService.error('User already exists', 'Duplicates');
            break;
          case '415':
            errorMessage = 'Session Expired';
            this.toastrService.error('Validation error occured', 'Validation');
            break;
          case '403':
            errorMessage = 'UnAuthorized';
            this.toastrService.error('Unauthorized to take action', 'Authorization error');
            break;
          case 422:
            isValidationError = true;
            errorMessage = Array.from(Object.keys(result.error_messages), k => result.error_messages[k]);
            break;
          case 404:
            errorMessage = 'Not Found';
            break;
          case 500:
            errorMessage = 'Internal Server Error';
            break;
        }
        return { errorMessage: errorMessage, isValidationError: isValidationError  };
      
  }
  confirmBox(){
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover it!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your record is safe :)',
          'error'
        )
      }
    })
  }

}
