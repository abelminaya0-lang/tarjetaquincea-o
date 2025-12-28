
export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface RSVPFormData {
  name: string;
  attending: boolean;
  guests: number;
  message: string;
}
