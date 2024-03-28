export interface User {
    userName: string;
    email: string;
    password: string;
    phoneNum: string;
    typeUser: string; // Update this to match your actual type
    lastName: string;
    firstName: string;
    address: string;
    company?: string; // Make company optional as you conditionally render it
  }
  
  