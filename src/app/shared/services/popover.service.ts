import { Injectable } from '@angular/core';
import { BroadcasterKeys } from '../helpers/enum';
import { Broadcaster } from '../helpers/providers/broadcaster';

@Injectable()
export class PopoverService {
  clientRect: ClientRect = new ClientRect();
  technicalSupport:boolean=false;
  mobileAppLinks:boolean=false;

  constructor(private broadcaster: Broadcaster) {}

  showPopover(isPopoverShown: boolean, e: any = null) {
    isPopoverShown = !isPopoverShown;
    var clientRect: any;
    if (e != null) {
      clientRect = e.target.getBoundingClientRect();
      e.stopPropagation();
    }
    if (this.clientRect) {
      this.listenEvent();
    } else {
      this.removeListener();
    }
    if (clientRect) {
      this.clientRect = new ClientRect(
        clientRect.top + 10 + 'px',
        clientRect.left + 10 + 'px'
      );
    } else {
      this.clientRect = new ClientRect();
    }
    return isPopoverShown;
  }



  hidePopover(isPopoverShown: boolean) {
    if (isPopoverShown) {
      this.removeListener();
      setTimeout(() => {
        isPopoverShown = false;
      }, 200);
    }
  }




  listenEvent() {
    document.addEventListener('click', (ev: any) => {
      if (
        !ev.target.id.includes('non_dismiss') &&
        !ev.target.classList.contains('clickableElem')
      ) {
        this.broadcaster.broadcast(BroadcasterKeys.hidePopover, true);
        this.removeListener();
      }
    });
  }

  removeListener() {
    document.removeEventListener('click', () => {});
  }
}

class ClientRect {
  top: string;
  left: string;

  constructor(top: string = '-1000px', left: string = '-1000px') {
    this.top = top;
    this.left = left;
  }
}
