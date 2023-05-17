export interface IEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  color: string;
  allDay: boolean;
}

//del later
export interface IEvent {
  name?: string;
  endTime?: string;
  startTime?: string;
}

  