import { Component, OnInit } from '@angular/core';
import { UserProperties } from '../user-properties.interface';
import { HttpClient } from '@angular/common/http';
import { GenericResponse } from '../generic-response.interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  constructor(private httpClient: HttpClient){}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.roles = this.getRoles();
  }

  userProperties: UserProperties = {
    userId: null,
    username: '',
    email: '',
    password: '',
    rolId: null
  }

  roles: any;

  readonly urlGetRoles = 'https://localhost:7251/api/Role';
  readonly url_user_api = 'https://localhost:7251/api/User';

  getRoles()
  {
    return this.httpClient.get(this.urlGetRoles);
  }

  postUser()
  {
    console.log("Se inicio post user");
    this.httpClient.post<GenericResponse>(this.url_user_api, this.userProperties).subscribe((responseData) => {
      alert(responseData.message);
    })
    console.log("Termino post user");
  }

}
