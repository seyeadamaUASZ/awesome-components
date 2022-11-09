import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, pipe, Observable, of } from "rxjs";
import { catchError,mapTo } from 'rxjs/operators'
import { environment } from "src/environments/environment";
import { ComplexFormValue } from "../models/comple-form-value.model";


@Injectable()
export class ComplexFormService {
  constructor(private http: HttpClient) {}

  saveUserInfo(formValue: ComplexFormValue): Observable<any> {
    return this.http.post(`${environment.apiUrl}/users`, formValue).pipe(
      mapTo(true),
      delay(1000),
      catchError(() => of(false).pipe(
        delay(1000)
      ))
    );
  }
}