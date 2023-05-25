import { apiGet, apiPost, apiDelete } from '../api';
import { IAgenda } from '../../interfaces/IItinerary';

interface PlaceData {
  place_id: string;
  place_name: string;
  web_picture_urls: string[];
  introduction: string;
  detail: string;
  contact: any;
  category_description: string;
  date: string;
  arrival_time: string;
  leave_time: string;
}

const getItinerary = async (itineraryId: string | undefined) => {
  const response = await apiGet(`itinerary/${itineraryId}`);
  return response.data;
};

const getPlace = async (placeId: string) => {
  const response = await apiGet(`places/${placeId}`);
  return response.data;
};

const getDetailedItinerary = async (itineraryId: string | undefined): Promise<IAgenda[]> => {
  const itinerary = await getItinerary(itineraryId);
  const plans = itinerary?.plan || [];
  const places: PlaceData[] = await Promise.all(plans.map((plan: any) => getPlace(plan.place_id)));

  // get detail from place for every place in itinerary
  const detailedItinerary: IAgenda[] = plans.map((plan: any, index: number) => {
    const place = places[index] || {};
    return {
      id: plan?.id,
      place_id: plan?.place_id,
      place_name: place?.place_name,
      web_picture_urls: place?.web_picture_urls,
      description: `${place?.introduction} ${place?.detail}`,
      contact: place?.contact,
      tags: [place?.category_description],
      date: plan?.date,
      arrival_time: plan?.arrival_time,
      leave_time: plan?.leave_time,
    };
  });
  return detailedItinerary;
};

const deleteItineraryItem = async (itineraryItemId: string) => {
  const response = await apiDelete(`itinerary/${itineraryItemId}`);
  return response;
};

export {
  getItinerary,
  getPlace,
  getDetailedItinerary,
  deleteItineraryItem,
};
