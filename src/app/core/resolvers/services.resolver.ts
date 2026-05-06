import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicesResolver implements Resolve<any> {
  resolve(): Observable<any> {
    return of({
      services: [
        { title: 'Mold Design & Engineering' },
        { title: 'Injection Molding Manufacturing' },
        { title: 'Quality Assurance & Testing' }
      ]
    }).pipe(delay(300));
  }
}
