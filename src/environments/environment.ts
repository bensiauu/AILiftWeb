import { addonEnvironment } from '@dis/settings/environments/environment';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const KEYCLOAK_URL = 'https://172.20.105.242/';

export const environment = {
  isMobile: false,
  i18n: {
    isSelectionEnabled: false,
    default: 'en',
    supported: [
      {text: 'English', value: 'en'},
      {text: 'Chinese', value: 'cn'}
    ]
  },
  production: false,
  DEV_TEST_USER: {
    id: 'Dev User 1',
    username: 'devuser1',
    email: 'devuser1@test.com',
    firstName: 'dev',
    lastName: 'user',
    enabled: true,
    emailVerified: true,
    totp: true
  },
  KEYCLOAK_URL: KEYCLOAK_URL + 'auth',
  KEYCLOAK_REALM: 'demo1',
  KEYCLOAK_CLIENT: 'DEMO_CLIENT', // Please add the client name(Id), 'INEVNTORY APP' is just a demo client name
  API_ROOT: '',                     // Please add your API Root
  APP_ROOT: 'http://localhost:4200',                     // Please add your APP Root
  KEYCLOAK_GET_CLIENT_ROLES_1: KEYCLOAK_URL + 'auth/admin/realms/demo1/users/',
  KEYCLOAK_GET_CLIENT_ROLES_2: '/role-mappings/clients/',
  KEYCLOAK_GET_CLIENT_ROLES_3: '/composite',
  KENDO_UI_LICENSE: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkxJQyJ9.eyJwcm9kdWN0cyI6W3sidHJpYWwiOmZhbHNlLCJjb2RlIjoiS0VORE9VSVJFQUNUIiwibGljZW5zZUV4cGlyYXRpb25EYXRlIjoxNjc4Mzk1NTg2fSx7InRyaWFsIjpmYWxzZSwiY29kZSI6IktFTkRPVUlDT01QTEVURSIsImxpY2Vuc2VFeHBpcmF0aW9uRGF0ZSI6MTY3ODM5NTU4Nn0seyJ0cmlhbCI6ZmFsc2UsImNvZGUiOiJLRU5ET1VJVlVFIiwibGljZW5zZUV4cGlyYXRpb25EYXRlIjoxNjc4Mzk1NTg2fSx7InRyaWFsIjpmYWxzZSwiY29kZSI6IktFTkRPVUlBTkdVTEFSIiwibGljZW5zZUV4cGlyYXRpb25EYXRlIjoxNjc4Mzk1NTg2fV0sImludGVncml0eSI6ImhHdFhIS2dLdnFJemtRNm5mMGtJcXFRZ05WMD0iLCJsaWNlbnNlSG9sZGVyIjoibXlvemFAc2ltdGVjaC5hLXN0YXIuZWR1LnNnIiwiaWF0IjoxNjU0NTkwMzE5LCJhdWQiOiJyaXlhX3NoZXRoQHNpbXRlY2guYS1zdGFyLmVkdS5zZyIsInVzZXJJZCI6IjcwMzJkZTIxLThmNzgtNDcyZi05MjFjLTY2ZDFmMDA4NjlkMyJ9.pa3QLGp6Fy1QGYkzSxmqCOUL3dtPj8MhytNTsZ76aanp5GGYDoHK_Fos5TOsalu3aAD5YYyg6NrvJucT-Mxe8XcY4PZqwW6pKL9et4YGvJAu8fMeOP6XW_8iVEUPCGFFWMpTyk0a3McECP4zTbvlX2iwfjUdJpZhkipfW5kpMPOOW9r33ONb55EMqOH9-5FoRcCRgNUGM_ocHZZaGAofudGnuQrPHRO9tjznuMWpxtzp0rdfYEJfzjmvvvB_gHBYNV82fK7eLw2_jlUTE9kXTf9ndePRIE4TwsSkc7f4vnreJ_j6R2HIziOnn0TzSJ9idTmgEspLmV2UnWx5YDwL3w',
  ...addonEnvironment
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
