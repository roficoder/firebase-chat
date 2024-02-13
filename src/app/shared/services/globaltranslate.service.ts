import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalTranslateService {
  constructor(public translate: TranslateService) {}

  result: string = '';
  getTranslation(str: any): string {
    this.translate.get(`demo.${str}`).subscribe((res: any) => {
      this.result = res;
    });
    return this.result;
  }
}
