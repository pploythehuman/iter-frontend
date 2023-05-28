export interface IEvent {
  id: string | undefined;
  place_id?: string | undefined;
  title: string;
  description?: string
  start: any;
  end: any;
  date: any;
  color?: string;
  allDay?: boolean;
  extendedProps?: any;
  web_picture_urls?: string;
}

export interface IAgenda {
  id?: string | number;
  place_id: string;
  place_name: string;
  web_picture_urls: string[];
  description: string;
  contact: any;
  location?: number[];
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