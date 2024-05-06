import {Injectable, NgZone} from '@angular/core';
import {DialogService} from '@progress/kendo-angular-dialog';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomDialogService {

  constructor(  private dialogService: DialogService,
                private ngZone: NgZone) { }

  confirm(): Observable<any>{
    return new Observable(observer => {
      this.ngZone.run(() => {
        const result =  this.dialogService.open({
          title: 'Please confirm',
          content: 'Are you sure you want to continue',
          actions: [
            { text: 'Yes', primary: true},
            { text: 'No' },
          ],
          width: 450,
          height: 200,
          minWidth: 250,
        }).result.subscribe(res => {
          observer.next(res);
          observer.complete();
        });

      });
    });
  }


  message(title: string,
          message: string,
          actions: Array<{text: string, primary: boolean}>,
          level: 'success' | 'error' | 'warning' | 'info'): Observable<any>{
    return new Observable(observer => {
      this.ngZone.run(() => {
        const dialog =  this.dialogService.open({
          title,
          content: message,
          actions,
          width: 450,
          height: 200,
          minWidth: 250,
        });

        dialog.dialog.location.nativeElement.classList.add(level);

        dialog.result.subscribe(res => {
          observer.next(res);
          observer.complete();
        });



      });
    });
  }
}
