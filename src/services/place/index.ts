import { apiGet, apiPost } from '../api';

interface ShaData {
    id: number,
    sha_name: string,
    sha_type_code: string,
    sha_type_description: string,
    sha_cate_id: string,
    sha_cate_description: string
}

interface LocationData {
    id: number,
    address: string,
    sub_district: string,
    district: string,
    province: string,
    postcode: string
}

interface ContactData {
    id: number,
    mobile_number: string[],
    phone_number: string[],
    fax_number: string[],
    emails: string[],
    urls: string[]
}

interface PlaceData {
    place_name: string,
    latitude: number,
    longitude: number,
    sha: ShaData,
    location: LocationData,
    contact: ContactData,
    introduction: string,
    detail: string,
    destination: string,
    category_code: string,
    category_description: string,
    how_to_travels: string[],
    mobile_picture_urls: string[],
    web_picture_urls: string[],
    payment_methods: string[],
    facilities: string[],
    services: string[]
}

const getPlace = async (placeId: string | undefined) => {
    if (placeId == undefined) {
      placeId = ""
    }
    const response = await apiGet<PlaceData>('/places/'+placeId, 
      {
        headers: {
          Authorization: 'Bearer '+ localStorage.getItem('auth'),
        },
      })
    return {
      status: response.status,
      data: JSON.stringify(response.data)
    };
  };
  
export {
    getPlace
};
export type { ShaData, ContactData, LocationData, PlaceData };
