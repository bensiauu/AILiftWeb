import {Component, OnInit} from '@angular/core';
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit {

  isTokenReady = false;

  constructor(private keyCloakService: KeycloakService) {
  }

  ngOnInit(): void {
    this.keyCloakService.getToken().then(
      token => {
        localStorage.setItem('token', token);
        this.isTokenReady = true;
      }
    ).catch(
      err => {
        console.log(err);
      }
    );
  }
}
