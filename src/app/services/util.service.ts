import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoutingService } from './routing.service';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';

declare const AesUtil: any;

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  // public menuItems: AppRoute[] = [];
  isLoading: boolean = false;

  constructor(
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private routing: RoutingService,
    private http: HttpService,
    private storage: StorageService
  ) { }

  // async setAuthData() {
  //   if (this.storage.token) {
  //     try {
  //       var userRes: any = await this.http.getAuthUser();
  //        if (userRes.isSuccess) {
  //         var role = userRes.data.role;
  //         delete userRes.data.role;
  //         this.storage.setUser(userRes.data);
  //         if (role) {
  //           await this.setMenuItems(role.menu);
  //         } else {
  //           await this.setMenuItems(MenuItems, true);
  //         }
  //       } else {
  //         alert('Session Expired');
  //         this.storage.logout();
  //       }
  //     } catch (e) {
  //         console.log(e);
  //     }
  //     if (!location.pathname.includes('private')) {
  //       this.routing.goToDashboard(true);
  //     }
  //   }
  // }

  async showToaster(msg: string, action: string | undefined = undefined) {
    var toasterRef = await this.snackbar.open(msg, action);
  }

  // showConfirmDialog(
  //   title: string = 'Confirm Action',
  //   message: string = 'Are you sure you want to do this?'
  // ): Promise<boolean> {
  //   return new Promise((resolve, reject) => {
  //     const dialogData = new ConfirmDialogModel(title, message);
  //     const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  //       panelClass: 'alertDialog',
  //       data: dialogData,
  //     });
  //     dialogRef.afterClosed().subscribe((dialogResult) => {
  //       resolve(dialogResult);
  //     });
  //   });
  // }

  getPaginationQuery(
    page: number = 1,
    count: number = 10,
    sortField: string = 'createdOn',
    sortOrder: number = -1,
    select: string = ''
  ) {
    var query = `?page=${page}&count=${count}&sortField=${sortField}&sortOrder=${sortOrder}`;
    if (select) {
      query += `&select=${select}`;
    }
    return query;
  }

  // getPaginationModel(
  //   page: number = 1,
  //   count: number = 10,
  //   sortField: string = 'createdOn',
  //   sortOrder: number = -1,
  //   query: any = {},
  //   select: string = ''
  // ) {
  //   var sort: any = {};
  //   sort[sortField] = sortOrder;
  //   var getAllQuery: GetAllQuery = {
  //     query: query,
  //     page: page,
  //     count: count,
  //     select: select,
  //     sort: sort,
  //   };
  //   return getAllQuery;
  // }

  convertToTitleCase(val: string) {
    if (val) {
      if (val.includes(' ')) {
        return val
          .split(' ')
          .map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
          .join(' ');
      } else {
        return `${val[0].toUpperCase()}${val.substring(1)}`;
      }
    } else {
      return '';
    }
  }

  // validateFields(fields: Field[], data: any): boolean {
  //   var isValid = true;
  //   for (let field of fields) {
  //     if (field.isRequired) {
  //       if (data[field.property]) {
  //         isValid = data[field.property].length > 0;
  //       } else {
  //         isValid = false;
  //       }
  //     }
  //   }
  //   return isValid;
  // }

  isFunction(obj: any) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
  }

  resolveFieldData(data: any, field: any): any {
    if (data && field) {
      if (this.isFunction(field)) {
        return field(data);
      } else if (field.indexOf('.') == -1) {
        return data[field];
      } else {
        let fields: string[] = field.split('.');
        let value = data;
        for (let i = 0, len = fields.length; i < len; ++i) {
          if (value == null) {
            return null;
          }
          value = value[fields[i]];
        }
        return value;
      }
    } else {
      return null;
    }
  }

  // mapClientSideRole(
  //   initialJSON: AppRoute[],
  //   permissions: AppRoute[],
  //   parentNode: boolean | undefined = undefined,
  //   isSuperadmin: boolean | undefined = undefined
  // ) {
  //   var items: AppRoute[] = initialJSON;
  //   for (let item of items) {
  //     var submenu = permissions.find(
  //       (x) =>
  //         x.routerLink == item.routerLink &&
  //         x.icon == item.icon &&
  //         x.title == item.title
  //     );
  //     if (submenu) {
  //       item.isActive = false;
  //       item.hasPermission = submenu!.hasPermission;
  //       if (parentNode) {
  //         item.hasPermission = parentNode;
  //       }
  //       if (isSuperadmin) {
  //         item.hasPermission = isSuperadmin;
  //       }
  //       if (submenu!.subMenu && submenu!.subMenu!.length) {
  //         item.subMenu = this.mapClientSideRole(
  //           item.subMenu!,
  //           submenu!.subMenu!,
  //           undefined,
  //           isSuperadmin
  //           // item.hasPermission,
  //         );
  //       }
  //     }
  //   }
  //   return items;
  // }

  // setMenuItems(
  //   rolePermissions: AppRoute[],
  //   isSuperadmin: boolean | undefined = undefined
  // ) {
  //   this.menuItems = this.mapClientSideRole(
  //     MenuItems,
  //     rolePermissions,
  //     undefined,
  //     isSuperadmin
  //   );
  // }

  // checkIsRouteAllowed(routerLink: string) {
  //   var isAllowed: boolean = true;
  //   isAllowed = this.checkPermission(this.menuItems, routerLink, 0);
  //   return isAllowed;
  // }

  // checkPermission(
  //   menuItems: AppRoute[],
  //   routerLink: string,
  //   nested: number
  // ): boolean {
  //   for (let menu of menuItems) {
  //     if (menu.routerLink == routerLink) {
  //       return menu.hasPermission!;
  //     } else if (menu.subMenu && menu.subMenu.length) {
  //       var currentLink = menu.subMenu[0].routerLink;
  //       if (this.getParent(currentLink) == this.getParent(routerLink)) {
  //         return this.checkPermission(menu.subMenu, routerLink, nested);
  //       }
  //     }
  //   }
  //   return false;
  // }

  getParent(routerLink: string) {
    var value = routerLink.slice(routerLink.indexOf('/') + 1);
    return value.slice(0, value.indexOf('/'));
  }


  // encrypt(data: any) {
  //   console.log("Encryption Enabled");
  //   let iv = CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex);
  //   let salt = CryptoJS.lib.WordArray.random(128 / 8).toString(
  //     CryptoJS.enc.Hex
  //   );

  //   let aesUtil = new AesUtil(128, 1000, CryptoJS);
  //   let ciphertext = aesUtil.encrypt(
  //     salt,
  //     iv,
  //     "a$ur5^$&xh#*b!jnbb$zvo9^9(op*(e%",
  //     data,
  //     CryptoJS
  //   );
  //   let aesPassword = iv + "::" + salt + "::" + ciphertext;
  //   return aesPassword;
  // }
}
