import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Action } from '../shared/helpers/enum';
// import { Action } from '../enum';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }


  showAlert(message: string,type:string | any='success') {
    Swal.fire('', message, type);
  }

  alreadyExists(name: string) {
    Swal.fire(name, `${name} Already Exists`, 'error');
  }

  wrongData(name: string) {
    Swal.fire(name, `${name} Not Allow`, 'error');
  }

  successfullSave(name: string) {
    Swal.fire(name, `${name} Added Successfully`, 'success');
  }

  successfullUpdate(name: string) {
    Swal.fire(name, `${name} Updated Successfully`, 'success');
  }

  successfullDeleted(name: string) {
    Swal.fire(name, `${name} Deleted Successfully`, 'success');
  }

  validateEmail(name: string) {
    Swal.fire(name, `Please validate your email address. Kindly check your inbox.`, 'success');
  }

  async confirm(type: string) {
    let message = ''
    if (type == Action.edit) message = 'Are You Want To Edit?'
    if (type == Action.delete) message = 'Are You Really Want To Delete?'
    return Swal.fire(type.toUpperCase(), message, 'question').then(async res => {
      return res.value;
    })
  }
}
