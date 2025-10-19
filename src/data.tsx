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

export const reports: Report[] = [
  {
    signed: false,
    result: "Result Comment",
    status: "Result Added",
    collBy: " 5.45 11/05",
    handling: "Johen Doe",
    cost: "N500",
    priority: "Low",
    lab: "Microbiology",
    test: "Blood Count",
    number: 1,
  },
  {
    signed: true,
    result: "Result Comment",
    status: "Result Added",
    collBy: " 5.45 11/05",
    handling: "Johen Doe",
    cost: "N500",
    priority: "High",
    lab: "Microbiology",
    test: "CMS",
    number: 2,
  },
  {
    signed: false,
    result: "Result Comment",
    status: "Result Added",
    collBy: " 5.45 11/05",
    handling: "Johen Doe",
    cost: "N500",
    priority: "Low",
    lab: "Microbiology",
    test: "Covid",
    number: 3,
  },
  {
    signed: true,
    result: "Result Comment",
    status: "Result Added",
    collBy: " 5.45 11/05",
    handling: "Johen Doe",
    cost: "N500",
    priority: "High",
    lab: "Microbiology",
    test: "Urin",
    number: 4,
  },
  {
    signed: false,
    result: "Result Comment",
    status: "Result Added",
    collBy: " 5.45 11/05",
    handling: "Johen Doe",
    cost: "N500",
    priority: "High",
    lab: "Microbiology",
    test: "Blood Count",
    number: 5,
  },
  {
    signed: false,
    result: "Result Comment",
    status: "Result Added",
    collBy: " 5.45 11/05",
    handling: "Johen Doe",
    cost: "N500",
    priority: "Low",
    lab: "Microbiology",
    test: "HB",
    number: 6,
  },
  {
    signed: false,
    result: "Result Comment",
    status: "Result Added",
    collBy: " 5.45 11/05",
    handling: "Johen Doe",
    cost: "N500",
    priority: "Low",
    lab: "Microbiology",
    test: "MB",
    number: 7,
  },
  {
    signed: false,
    result: "Result Comment",
    status: "Result Added",
    collBy: " 5.45 11/05",
    handling: "Johen Doe",
    cost: "N500",
    priority: "Low",
    lab: "Microbiology",
    test: "Urin",
    number: 8,
  },
  {
    signed: false,
    result: "Result Comment",
    status: "Result Added",
    collBy: " 5.45 11/05",
    handling: "Johen Doe",
    cost: "N500",
    priority: "Low",
    lab: "Microbiology",
    test: "MD",
    number: 9,
  },
];
