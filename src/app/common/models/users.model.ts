export class User {
  user_Id: number;
  email_address: string;
  phone_number: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  created_on: string;
  account_status: number;

  constructor(
    user_Id: number,
    email_address: string,
    phone_number: string,
    first_name: string,
    middle_name: string,
    last_name: string,
    created_on: string,
    account_status: number
  ) {
    (this.user_Id = user_Id),
      (this.email_address = email_address),
      (this.phone_number = phone_number),
      (this.first_name = first_name),
      (this.middle_name = middle_name),
      (this.last_name = last_name),
      (this.created_on = created_on),
      (this.account_status = account_status);
  }
}
