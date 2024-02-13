import { Injectable } from '@angular/core';
import { SweetAlertIcon } from 'sweetalert2';
import Swal from 'sweetalert2';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})

export class AlertService {
  constructor(public storage: StorageService) { }
  show_alert(
    alert_title = '',
    alert_text = '',
    alert_icon: SweetAlertIcon = 'success',
  ) {
    Swal.fire({ title: alert_title, text: alert_text, icon: alert_icon });
  }

}
