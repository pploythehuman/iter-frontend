import { apiGet, apiPost, apiDelete, apiPut } from "../api";

export interface Sha {
  id: number;
  sha_name: string | null;
  sha_type_code: string | null;
  sha_type_description: string | null;
  sha_cate_id: string | null;
  sha_cate_description: string | null;
}

export interface Location {
  id: number;
  address: string;
  sub_district: string;
  district: string;
  province: string;
  postcode: string;
}

export interface Contact {
  id: number;
  mobile_number: string[];
  phone_number: string[];
  fax_number: string[];
  emails: string[];
  urls: string[];
}

export interface IPlace {
  id: string;
  place_name: string;
  latitude?: number;
  longitude?: number;
  sha?: Sha;
  location?: Location;
  contact?: Contact;
  introduction?: string;
  detail?: string;
  destination?: string;
  category_code?: string;
  category_descriptio?: string;
  how_to_travels?: string[];
  mobile_picture_urls?: string[];
  web_picture_urls?: string[];
  payment_methods?: string[];
  facilities?: string[] | null;
  services?: string[] | null;
}

const getPlace = async (placeId: string) => {
  const response = await apiGet(`places/${placeId}/`);
  return response.data;
};

const getPlaces = async (pageNumber: number | string) => {
  console.log(`places/?page=${pageNumber}`)
  const response = await apiGet(`places/?page=${pageNumber}`);
  return response.data;
};

const getRestaurant = async (placeId: string) => {
  const response = await apiGet(`places/restaurants/${placeId}/`);
  return response.data;
};

const getRestaurants = async () => {
  const response = await apiGet(`places/restaurants/`);
  return response.data;
};

const getShop = async (placeId: string) => {
  const response = await apiGet(`places/shops/`);
  return response.data;
};

const getShops = async (placeId: string) => {
  const response = await apiGet(`places/shops/${placeId}/`);
  return response.data;
};

const getAttraction = async (placeId: string) => {
  const response = await apiGet(`places/attractions/`);
  return response.data;
};

const getAttractions = async (placeId: string) => {
  const response = await apiGet(`places/attractions/${placeId}/`);
  return response.data;
};

const getAccomondation = async (placeId: string) => {
  const response = await apiGet(`places/accommodations/`);
  return response.data;
};

const getAccomondations = async (placeId: string) => {
  const response = await apiGet(`places/accommodations/${placeId}/`);
  return response.data;
};


export {
  getPlace,
  getPlaces,
  getRestaurant,
  getRestaurants,
  getShop,
  getShops,
  getAttraction,
  getAttractions,
  getAccomondation,
  getAccomondations
}
// import { apiGet, apiPost } from '../api';

// interface ShaData {
//     id: number,
//     sha_name: string,
//     sha_type_code: string,
//     sha_type_description: string,
//     sha_cate_id: string,
//     sha_cate_description: string
// }

// interface LocationData {
//     id: number,
//     address: string,
//     sub_district: string,
//     district: string,
//     province: string,
//     postcode: string
// }

// interface ContactData {
//     id: number,
//     mobile_number: string[],
//     phone_number: string[],
//     fax_number: string[],
//     emails: string[],
//     urls: string[]
// }

// interface PlaceData {
//     place_name: string,
//     latitude: number,
//     longitude: number,
//     sha: ShaData,
//     location: LocationData,
//     contact: ContactData,
//     introduction: string,
//     detail: string,
//     destination: string,
//     category_code: string,
//     category_description: string,
//     how_to_travels: string[],
//     mobile_picture_urls: string[],
//     web_picture_urls: string[],
//     payment_methods: string[],
//     facilities: string[],
//     services: string[]
// }

// const getPlace = async (placeId: string | undefined) => {
//     if (placeId == undefined) {
//       placeId = ""
//     }
//     const response = await apiGet<PlaceData>('/places/'+placeId)
//     return {
//       status: response.status,
//       data: JSON.stringify(response.data)
//     };
//   };
  
// export {
//     getPlace
// };
// export type { ShaData, ContactData, LocationData, PlaceData };
