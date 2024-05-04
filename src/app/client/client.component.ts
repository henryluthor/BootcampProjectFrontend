import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientProperties } from '../client-properties.interface';
import { ClientInsertResponse } from '../client-insertresponse.interface';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit {

  // readonly root_url = 'https://jsonplaceholder.typicode.com/posts';
  readonly url_client_api = 'https://localhost:7251/api/Client';

  clients: any;

  postOrPut: string = '';

  constructor(private httpClient: HttpClient){}

  clientProperties: ClientProperties = {
    clientid: null,
    firstname: '',
    lastname: '',
    identification: '',
    phonenumber: '',
    address: '',
    email: ''
  };


  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.clients = this.getClients();
  }

  getClients()
  {
    return this.httpClient.get(this.url_client_api);
  }

  getClient(clientid: number)
  {
    var clientSelected: any;

    this.httpClient.get(this.url_client_api + '/' + clientid).subscribe((responseData) => {
      clientSelected = responseData;
      this.clientProperties = clientSelected;
    });

  }

  postClient()
  {

    if(this.clientProperties.referenceaddress == '')
    {
      this.clientProperties.referenceaddress = null;
    }
    this.httpClient.post<ClientInsertResponse>(this.url_client_api, this.clientProperties).subscribe((responseData) => {

      if(responseData.statusCode == 200)
      {
        alert("Registro exitoso");
        this.clients = this.getClients();
      }
      else
      {
        alert("Registro no exitoso. Error: " + responseData.message)
      }

    });
  }

  putClient()
  {
    var updateSuccessful;
    var clientSelectedId = this.clientProperties.clientid;
    this.httpClient.put<ClientInsertResponse>(this.url_client_api + '/' + clientSelectedId, this.clientProperties).subscribe((responseData) => {
      updateSuccessful = responseData;
      if(responseData.statusCode == 200)
      {
        alert("Actualizacion exitosa");
        this.clients = this.getClients();
      }
      else
      {
        alert("Actualizacion no exitosa. Error: " + responseData.message);
      }
    });
  }

  saveClient()
  {
    if(this.postOrPut == 'post')
    {
      console.log("se escogio post");
      this.clients = this.httpClient.post(this.url_client_api, this.cleanClientProperties);
      console.log("Este el el posts de post:");
      console.log(this.clients);
      alert(this.clients);
      console.log("despues de linea que hace el post");
    }
    else if(this.postOrPut == 'put')
    {
      console.log("se escogio put");
      this.clients = this.httpClient.put(this.url_client_api + '/4', this.cleanClientProperties);
      console.log("despues de linea que hace el put");
    }
  }


  cleanClientProperties()
  {
    this.clientProperties = {
      clientid: null,
      firstname: '',
      lastname: '',
      identification: '',
      phonenumber: '',
      address: '',
      referenceaddress: null,
      email: ''
    }
  }

  setPostOrPut(x: string)
  {
    this.postOrPut = x;
  }


}

