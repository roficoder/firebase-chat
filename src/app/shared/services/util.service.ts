import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from './http.service';
import { NgForm } from '@angular/forms';
import { Form, Languages, Path } from '../helpers/enum';
import { GlobalTranslateService } from './globaltranslate.service';
import { AlertService } from './alert.service';
import Swal from 'sweetalert2';
import { StorageService } from './storage.service';
import { RoutingService } from './routing.service';
import * as CryptoJS from "crypto-js";
declare const AesUtil: any;

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  showLoader: boolean = false;
  tourIndex: number = 0;
  isTutorialShown: boolean = false;
  isOpenAboutUsDropDown: boolean = false;
  isOpenLawsAndRegulationDropDown: boolean = false;
  reviewFeedback: boolean = false;
  passwordValidationMsg: string = '';
  constructor(
    public sanitizer: DomSanitizer,
    public http: HttpService,
    private translate: GlobalTranslateService,
    private alertService: AlertService,
    private storage: StorageService,
    public routing: RoutingService
  ) { }

  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  getOrdinalSuffix(i: number): string {
    var j = i % 10,
      k = i % 100;
    if (j == 1 && k != 11) {
      return 'st';
    }
    if (j == 2 && k != 12) {
      return 'nd';
    }
    if (j == 3 && k != 13) {
      return 'rd';
    }
    return 'th';
  }

  async downloadMyFile(data: any) {
    var array: any = [];
    array.push(data.infoData);
    const replacer = (key: any, value: any) => (value === null ? '' : value);
    const header = Object.keys(array[0]);
    const csv = array.map((row: any) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(',')
    );
    csv.unshift(header.join(','));
    const csvArray = csv.join('\r\n');
    const a = document.createElement('a');
    const blob = new Blob([csvArray], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = `${data.infoData.fullName}.csv`;
    debugger;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  isValidEmail(emailString: string): boolean {
    try {
      // let pattern = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");
      let pattern = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$');
      let valid = pattern.test(emailString);
      return valid;
    } catch (TypeError) {
      return false;
    }
  }

  async downloadFile(name: string, url: string) {
    let link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', url);
    link.setAttribute('download', name);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  async passwordValidation(form: NgForm) {
    const uppercaseRegExp = /(?=.*?[A-Z])/;
    const lowercaseRegExp = /(?=.*?[a-z])/;
    const digitsRegExp = /(?=.*?[0-9])/;
    const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
    const minLengthRegExp = /.{8,}/;
    (form.controls['password'] as any).errors = {
      upperCase: !uppercaseRegExp.test(form.controls['password'].value),
      lowerCase: !lowercaseRegExp.test(form.controls['password'].value),
      digits: !digitsRegExp.test(form.controls['password'].value),
      specialChar: !specialCharRegExp.test(form.controls['password'].value),
      min: !minLengthRegExp.test(form.controls['password'].value),
    };
  }

  somethingWentWrong(error?: string) {
    this.alertService.show_alert(
      this.translate.getTranslation(error ? error : 'something-went-wrong'),
      '',
      'error',
      'تم'
    );
  }

  decrypt(data: any) {
    let res = data.split("::");
    let iv = res[0];
    let salt = res[1];
    let ciphertext = res[2];
    let aesUtil = new AesUtil(128, 1000, CryptoJS);
    let decryptedData = aesUtil.decrypt(
      salt,
      iv,
      "a$ur5^$&xh#*b!jnbb$zvo9^9(op*(e%",
      ciphertext,
      CryptoJS
    );
    decryptedData = decryptedData;
    return decryptedData;
  }

  encrypt(data: any) {
    console.log("Encryption Enabled");
    let iv = CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex);
    let salt = CryptoJS.lib.WordArray.random(128 / 8).toString(
      CryptoJS.enc.Hex
    );

    let aesUtil = new AesUtil(128, 1000, CryptoJS);
    let ciphertext = aesUtil.encrypt(
      salt,
      iv,
      "a$ur5^$&xh#*b!jnbb$zvo9^9(op*(e%",
      data,
      CryptoJS
    );
    let aesPassword = iv + "::" + salt + "::" + ciphertext;
    return aesPassword;
  }


  confirmSignout(text?: string) {
    return Swal.fire({
      title: this.translate.getTranslation('logout'),
      text: this.translate.getTranslation(text),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translate.getTranslation('logout'),
      confirmButtonColor: '#0b5455',
      cancelButtonText: this.translate.getTranslation('cancel'),
    })
  }

  get path() {
    return Path;
  }
  get language() {
    return Languages;
  }
  get form() {
    return Form;
  }




















}
