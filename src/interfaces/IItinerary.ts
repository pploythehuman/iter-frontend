export interface IEvent {
  id: string | undefined;
  title: string;
  description?: string
  start: any;
  end: any;
  date: any;
  color?: string;
  allDay?: boolean;
}

export interface IAgenda {
  id: string | number;
  name: string;
  imageUrl: string[];
  description: string;
  location: number[];
  tags: string[];
  date: string;
  arrival_time: string;
  leave_time: string;
}