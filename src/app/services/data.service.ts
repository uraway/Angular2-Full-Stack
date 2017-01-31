import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getQuizes(): Observable<any> {
    return this.http.get('/api/quizes').map(res => res.json());
  }

  getQuiz(quiz: any): Observable<any> {
    return this.http.get(`/api/quizes${quiz._id}`).map(res => res.json());
  }

  addQuiz(quiz: any): Observable<any> {
    return this.http.post('/api/quizes', JSON.stringify(quiz), this.options)
  }

  editQuiz(quiz: any): Observable<any> {
    return this.http.put(`/api/quizes/${quiz._id}`, JSON.stringify(quiz), this.options);
  }

  deleteQuiz(quiz: any): Observable<any> {
    return this.http.delete(`/api/quizes/${quiz._id}`, this.options);
  }

  getUsers(): Observable<any> {
    return this.http.get('/api/users').map(res => res.json());
  }

  addUser(user: any): Observable<any> {
    return this.http.post('/api/users', JSON.stringify(user), this.options)
  }

}
