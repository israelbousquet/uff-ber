import { HttpRequest, HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, pluck, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseResourceService <T> {
  constructor(private http: HttpClient) { }

  customAction(method: string, path: string, resource: any, query?: string, columns?: Array<string>): Observable<T> {
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

  create(resource: T, custom_url?: string): Observable<T> {
    let url = "";
    if (custom_url) url = `${environment.baseUrl}/${custom_url}`;
    else url = environment.baseUrl;
    return this.http.post(url, resource).pipe(map(res => res), catchError(this.handleError));
  }

  update(resource: any, key: string, custom_url?: string): Observable<T> {
    let url = "";
    if (custom_url) url = `${environment.baseUrl}/${custom_url}`;
    else url = `${environment.baseUrl}?${key}=${resource[key]}`;
    return this.http.put(url, resource).pipe(map(res => res), catchError(this.handleError));
  }

  protected handleError(error: any): Observable<any> {
    return throwError(error);
  }
}
