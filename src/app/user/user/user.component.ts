import { Component } from '@angular/core';
import { ClientProperties } from '../../client-properties.interface';
import { UserProperties } from '../../user-properties.interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  userProperties: UserProperties = {
    userId: null,
    username: '',
    email: '',
    password: '',
    rolId: null
  }

}
