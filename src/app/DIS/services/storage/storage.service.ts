import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  private _subject = new Subject(); // For subscription

  watch(): Observable<any> {
    return this._subject.asObservable(); // Return Observable for async sequential responses
  }

  setItem(key: string, data: any): boolean {
    localStorage.setItem(key, data);
    this._subject.next(data); // Broadcast next-ed data to all subscribers
    return true;
  }

  // Not used
  getItem(key: string) {
    return localStorage.getItem(key);
  }
}
