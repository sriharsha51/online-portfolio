import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MessageService {

  domain:string = "";

  constructor(private http: Http) { }

  submitMessage(data) {
    return this.http.post(this.domain + 'message/submit', data).map(res => res.json());
  }

}
