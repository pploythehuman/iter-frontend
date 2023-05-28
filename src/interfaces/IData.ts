export interface PlaceData {
  place_id: string;
  place_name: string;
  web_picture_urls: string[];
  introduction: string;
  detail: string;
  contact: any;
  latitude: number;
  longitude: number;
  category_description: string;
  date: string;
  arrival_time: string;
  leave_time: string;
}

export interface AgendaData {
  id?: number;
  place_id: string;
  travel_time: {[key: string]: number};
  date: string;
  arrival_time: string;
  leave_time: string;
}