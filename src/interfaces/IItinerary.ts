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
  id: string;
  name: string;
  imageUrl: string[];
  description: string;
  rating?: number;
  location: number[];
  tags: string[];
  date: string;
  arrival_time: string;
  leave_time: string;
}