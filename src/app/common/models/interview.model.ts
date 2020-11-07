export class Interview {
  description: string;
  completed: boolean;
  interview_id: number;
  interview_name: string;
  location_name: string;
  location_id: number;
  location_code: string;
  start_date: string;
  started_on: string;
  completed_on: string;

  constructor(
    description: string,
    completed: boolean,
    interview_id: number,
    interview_name: string,
    location_name: string,
    location_id: number,
    location_code: string,
    start_date: string,
    started_on: string,
    completed_on: string
  ) {
    (this.description = description),
      (this.completed = completed),
      (this.interview_id = interview_id),
      (this.interview_name = interview_name),
      (this.location_name = location_name),
      (this.location_id = location_id),
      (this.location_code = location_code),
      (this.start_date = start_date),
      (this.started_on = started_on),
      (this.completed_on = completed_on);
  }
}
