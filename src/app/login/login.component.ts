import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericResponse } from '../generic-response.interface';
import { LoginInputs } from '../login-inputs.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  // readonly url_user_api = "https://localhost:7251/api/User";

  readonly url_user_api = "https://localhost:7251/api/Login";

  constructor(private httpClient: HttpClient){}

  loginInputs: LoginInputs = {
    username : '',
    password : ''
  };


  GetUserByUsername(username: string)
  {
    var empezar = this.httpClient.get(this.url_user_api + "/" + username);
  }

  public LoginProcess()
  {
    this.httpClient.post<GenericResponse>(this.url_user_api, this.loginInputs).subscribe((responseData) => {
      alert(responseData.message);
    });
  }

}
