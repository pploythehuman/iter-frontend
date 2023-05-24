import { apiGet, apiPost, apiDelete } from '../api';

interface IPlace {
  data: {
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
  };
}

const getItinerary = async (itineraryId: string | undefined) => {
  const response = await apiGet(`itinerary/${itineraryId}`);
  return response;
};

const getPlace = async (placeId: string) => {
  const response = await apiGet(`places/${placeId}`);
  return response;
};

const getDetailedItinerary = async (itineraryId: string | undefined) => {
  const itinerary = await getItinerary(itineraryId);
  const plans = itinerary?.data.plan || [];
  const places: IPlace[] = await Promise.all(plans.map((plan: any) => getPlace(plan.place_id)));

  // map the get itinerary and get place together
  const detailedItinerary = plans.map((plan: any, index: number) => {
    const place = places[index]?.data || {};
    return {
      id: plan.place_id,
      name: place.place_name,
      web_picture_urls: place.web_picture_urls,
      description: `${place.introduction} ${place.detail}`,
      contact: place.contact,
      tags: [place.category_description],
      date: plan.date,
      arrival_time: plan.arrival_time,
      leave_time: plan.leave_time,
    };
  });
  return detailedItinerary
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
