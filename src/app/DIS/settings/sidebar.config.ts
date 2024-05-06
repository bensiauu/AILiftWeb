import { RoleTypes } from '@dis/auth/roles.enum';
// Will allow show/hide of links in sidebar when sign-on flow is implemented

export const config = [
  // Add navigation group here
  // {
  //   group: 'Navigation Group 1',
  //   // Add navigation items here
  //   items: [
  //     {
  //       name: 'Sample',
  //       icon: 'crosstab',
  //       link: './sample',
  //       elevation: [RoleTypes.ROLE_MANAGER, RoleTypes.ROLE_USER] // Specify user roles allowed to see this link: NOT YET IMPLEMENTED
  //     },
  //     {
  //       name: 'Sample 2',
  //       icon: 'crosstab',
  //       link: './sample2',
  //       elevation: [RoleTypes.ROLE_MANAGER, RoleTypes.ROLE_USER]
  //     }
  //   ]
  // },
  // {
  //   group: 'Navigation Group 2',
  //   items: [
  //     {
  //       name: 'Login',
  //       icon: 'login',
  //       link: './login',
  //       elevation: [RoleTypes.ROLE_ADMIN]
  //     }
  //   ]
  // },
  // {
  //   group: 'Dashboard',
  //   icon: 'crosstab',
  //   link: './dashboard-one',
  //   elevation: [] // Specify user roles allowed to see this link: NOT YET IMPLEMENTED
  // },
  {
    group: 'Dashboard',
    icon: 'crosstab',
    link: './dashboard',
    elevation: [] // Specify user roles allowed to see this link: NOT YET IMPLEMENTED
  },
  // {
  //   group: 'Product',
  //   icon: 'crosstab',
  //   items: [
  //     {
  //       name: 'Dashboard Sample 1',
  //       icon: 'crosstab',
  //       link: './dashboard-one',
  //       elevation: [] // Specify user roles allowed to see this link: NOT YET IMPLEMENTED
  //     },
  //     {
  //       name: 'Dashboard Sample 2',
  //       icon: 'crosstab',
  //       link: './dashboard-two',
  //       elevation: [] // Specify user roles allowed to see this link: NOT YET IMPLEMENTED
  //     },
  //     {
  //       name: 'Dashboard Sample 3',
  //       icon: 'crosstab',
  //       link: './dashboard-three',
  //       elevation: [] // Specify user roles allowed to see this link: NOT YET IMPLEMENTED
  //     },
  //     {
  //       name: 'Table',
  //       icon: 'crosstab',
  //       link: './table',
  //       elevation: []
  //     },
  //     {
  //       name: 'Input Field',
  //       icon: 'crosstab',
  //       link: './input-field',
  //       elevation: []
  //     },
  //     {
  //       name: 'Form Filling',
  //       icon: 'crosstab',
  //       link: './form-filling',
  //       elevation: []
  //     }
  //   ]
  // },
  // {
  //   group: 'Resource',
  //   icon: 'crosstab',
  //   items: [
  //     {
  //       name: 'Dashboard Sample 1',
  //       icon: 'crosstab',
  //       link: './dashboard-one',
  //       elevation: [] // Specify user roles allowed to see this link: NOT YET IMPLEMENTED
  //     },
  //     {
  //       name: 'Dashboard Sample 2',
  //       icon: 'crosstab',
  //       link: './dashboard-two',
  //       elevation: [] // Specify user roles allowed to see this link: NOT YET IMPLEMENTED
  //     },
  //     {
  //       name: 'Dashboard Sample 3',
  //       icon: 'crosstab',
  //       link: './dashboard-three',
  //       elevation: [] // Specify user roles allowed to see this link: NOT YET IMPLEMENTED
  //     },
  //     {
  //       name: 'Table',
  //       icon: 'crosstab',
  //       link: './table',
  //       elevation: []
  //     },
  //     {
  //       name: 'Input Field',
  //       icon: 'crosstab',
  //       link: './input-field',
  //       elevation: []
  //     },
  //     {
  //       name: 'Form Filling',
  //       icon: 'crosstab',
  //       link: './form-filling',
  //       elevation: []
  //     }
  //   ]
  // },
  // {
  //   group: 'Scheduling',
  //   icon: 'crosstab',
  //   items: [
  //     {
  //       name: 'Dashboard Sample 1',
  //       icon: 'crosstab',
  //       link: './dashboard-one',
  //       elevation: [] // Specify user roles allowed to see this link: NOT YET IMPLEMENTED
  //     },
  //     {
  //       name: 'Dashboard Sample 2',
  //       icon: 'crosstab',
  //       link: './dashboard-two',
  //       elevation: [] // Specify user roles allowed to see this link: NOT YET IMPLEMENTED
  //     },
  //     {
  //       name: 'Dashboard Sample 3',
  //       icon: 'crosstab',
  //       link: './dashboard-three',
  //       elevation: [] // Specify user roles allowed to see this link: NOT YET IMPLEMENTED
  //     },
  //     {
  //       name: 'Table',
  //       icon: 'crosstab',
  //       link: './table',
  //       elevation: []
  //     },
  //     {
  //       name: 'Input Field',
  //       icon: 'crosstab',
  //       link: './input-field',
  //       elevation: []
  //     },
  //     {
  //       name: 'Form Filling',
  //       icon: 'crosstab',
  //       link: './form-filling',
  //       elevation: []
  //     }
  //   ]
  // },
  // {
  //   group: 'Process',
  //   icon: 'crosstab',
  //   items: [
  //     {
  //       name: 'Dashboard Sample 1',
  //       icon: 'crosstab',
  //       link: './dashboard-one',
  //       elevation: [] // Specify user roles allowed to see this link: NOT YET IMPLEMENTED
  //     },
  //     {
  //       name: 'Dashboard Sample 2',
  //       icon: 'crosstab',
  //       link: './dashboard-two',
  //       elevation: [] // Specify user roles allowed to see this link: NOT YET IMPLEMENTED
  //     },
  //     {
  //       name: 'Dashboard Sample 3',
  //       icon: 'crosstab',
  //       link: './dashboard-three',
  //       elevation: [] // Specify user roles allowed to see this link: NOT YET IMPLEMENTED
  //     },
  //     {
  //       name: 'Table',
  //       icon: 'crosstab',
  //       link: './table',
  //       elevation: []
  //     },
  //     {
  //       name: 'Input Field',
  //       icon: 'crosstab',
  //       link: './input-field',
  //       elevation: []
  //     },
  //     {
  //       name: 'Form Filling',
  //       icon: 'crosstab',
  //       link: './form-filling',
  //       elevation: []
  //     }
  //   ]
  // },
  // {
  //   group: 'Others',
  //   icon: 'crosstab',
  //   items: [
  //     {
  //       name: 'Dashboard Sample 1',
  //       icon: 'crosstab',
  //       link: './dashboard-one',
  //       elevation: [] // Specify user roles allowed to see this link: NOT YET IMPLEMENTED
  //     },
  //     {
  //       name: 'Dashboard Sample 2',
  //       icon: 'crosstab',
  //       link: './dashboard-two',
  //       elevation: [] // Specify user roles allowed to see this link: NOT YET IMPLEMENTED
  //     },
  //     {
  //       name: 'Dashboard Sample 3',
  //       icon: 'crosstab',
  //       link: './dashboard-three',
  //       elevation: [] // Specify user roles allowed to see this link: NOT YET IMPLEMENTED
  //     },
  //     {
  //       name: 'Table',
  //       icon: 'crosstab',
  //       link: './table',
  //       elevation: []
  //     },
  //     {
  //       name: 'Input Field',
  //       icon: 'crosstab',
  //       link: './input-field',
  //       elevation: []
  //     },
  //     {
  //       name: 'Form Filling',
  //       icon: 'crosstab',
  //       link: './form-filling',
  //       elevation: []
  //     }
  //   ]
  // },
  
];
