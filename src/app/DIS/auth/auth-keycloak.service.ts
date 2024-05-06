import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { User } from '../components/profile-menu/profile-menu.props';
import { RoleTypes } from './roles.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthKeycloakService {

  constructor(private keycloakService: KeycloakService) { }

  logout() {
    this.keycloakService.logout();
  }

  async isLoggedIn(): Promise<boolean> {
    console.log("before");
    let isLogIn = await this.keycloakService.isLoggedIn();
    console.log("after");
    return isLogIn;
  }

  getUserDetails = async(): Promise<User> => {
    if (await this.isLoggedIn()) {
      console.log("get user detail");
      let userDetails = await this.keycloakService.loadUserProfile();
      let token = await this.keycloakService.getToken();

      let userRole = this.keycloakService
        .isUserInRole(RoleTypes.ADMIN_INVENTORY) ?
        'Admin' : this.keycloakService
          .isUserInRole(RoleTypes.USER_MGMT_INVENTORY) ?
        'User-Manager' : this.keycloakService
          .isUserInRole(RoleTypes.USER_INVENTORY) ?
        'User' :
        'Pending';
      // console.log(userDetails);
      // console.log(this.keycloakService.getUserRoles());
      // console.log(userDetails['attributes'].mobile[0]);
      console.log(token);
      return {
        id: userDetails.username,
        role: userRole,
        email: userDetails.email,
        contact: userDetails['attributes'] ?
          (userDetails['attributes'].mobile ? userDetails['attributes'].mobile[0] : '') : ''
      };
    }
    else {
      console.log("Not Logged In !");
      return {} as User;
    }
  }

  isAllowedToAccess() {  //To judge if the current user has rights to access this project
    const excludeRealmRoles = false;

    // Map a emum obj into key-value array
    const roleTypesArray = Object.keys(RoleTypes).map(key => RoleTypes[key] );

    const currentRoles = this.keycloakService.getUserRoles(excludeRealmRoles);

    // Checks of currentRoles has value in roleTypesArray
    const isFounded = currentRoles.some( item => roleTypesArray.includes(item) );

    if (isFounded){
      return true;
    }
    return false;
  }
}
