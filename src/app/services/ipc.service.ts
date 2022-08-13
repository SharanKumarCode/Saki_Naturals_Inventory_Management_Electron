import { Injectable } from '@angular/core';

declare global {
  interface Window {
    electronapi:any;
  }
}

@Injectable({
  providedIn: 'root'
})

export class IpcService {

  _ipc: any;

  constructor() {
    
    if (window.electronapi) {
      try {
        this._ipc = window.electronapi;
        
      } catch (e) {
        throw e;
      }
    } else {
      console.warn('Electron\'s IPC was not loaded');
    }
  }

  public send(channel: string): void {
    if (!this._ipc) {
      return;
    }
    this._ipc.send(channel);
  }
}
