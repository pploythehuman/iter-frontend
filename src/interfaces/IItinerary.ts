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
  contact: any;
  tags?: string[];
  date: string;
  arrival_time: string;
  leave_time: string;
}

export interface IItinerary {
  id?: number;
  owner: number;
  co_travelers: number[];
  destination: string;
  plan: any[];
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
}