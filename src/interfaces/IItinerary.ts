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
  id?: string | number;
  place_id: string | number;
  place_name: string;
  web_picture_urls: string[];
  description: string;
  tags?: string[];
  date: string;
  arrival_time: string;
  leave_time: string;
  contact: any;
}