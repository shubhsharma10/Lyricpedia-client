export class User {
  _id: string;
  username: string;
  password: string;
  userType: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  followers = [];
  following = [];
}
