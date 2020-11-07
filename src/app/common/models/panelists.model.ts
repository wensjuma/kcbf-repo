export class Panelists {
  absent: boolean;
  attended: boolean;
  attendedDate: string;
  description: string;
  email_address: string;
  first_name: string;
  interviewer_id: number;
  last_name: string;
  middle_name: string;
  panel_role: string;
  phone_number: string;
  user_id: number;
  constructor(
    absent: boolean,
    attended: boolean,
    attendedDate: string,
    description: string,
    email_address: string,
    first_name: string,
    interviewer_id: number,
    last_name: string,
    middle_name: string,
    panel_role: string,
    phone_number: string,
    user_id: number
  ) {
    (this.absent = absent),
      (this.attended = attended),
      (this.attendedDate = attendedDate),
      (this.description = description),
      (this.email_address = email_address),
      (this.first_name = first_name),
      (this.interviewer_id = interviewer_id),
      (this.last_name = last_name),
      (this.middle_name = middle_name),
      (this.panel_role = panel_role),
      (this.phone_number = phone_number),
      (this.user_id = user_id);
  }
}
