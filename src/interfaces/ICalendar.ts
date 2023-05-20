export interface IEvent {
  id: string;
  title: string;
  description?: string
  start: any;
  end: any;
  color?: string;
  allDay: boolean;
}

//del later
export interface IEvent {
  name?: string;
  endTime?: string;
  startTime?: string;
}

  