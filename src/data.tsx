export interface Report {
  signed: boolean;
  result: string;
  status: string;
  collBy: string;
  handling: string;
  cost: string;
  priority: string;
  lab: string;
  test: string;
  number: number;
}
export type Appointment = {
  appointmentId: number;
  name: string;
  email: string;
  phone: string;
  diagnosis: string[];
  key: number;
};
