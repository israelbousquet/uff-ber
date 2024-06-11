import { HttpRequest, HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, pluck, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseResourceService {
  constructor(private http: HttpClient) { }

  customAction(method: string, path: string, resource: any, query?: string, columns?: Array<string>): Observable<any> {
    let url = "";
    if (query) url = `${environment.baseUrl}/${path}?${query}`;
    else url = `${environment.baseUrl}/${path}`;

    let req: HttpRequest<any>;

    if (method === "GET") {
      req = new HttpRequest(method, url, {
        headers: new HttpHeaders().append("columns", columns ?? []),
      });
    } else {
      req = new HttpRequest(method, url, resource);
    }

    return this.http.request(req).pipe(
      pluck("body"),
      map((retorno: any) => retorno),
      catchError(this.handleError)
    );
  }

  protected handleError(error: any): Observable<any> {
    return throwError(error);
  }
}
