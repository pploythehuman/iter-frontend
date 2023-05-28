import { apiGet, apiPost, apiDelete, apiPut } from "../api";
import { getProfile } from '../profile';
import { IAgenda, IItinerary } from "../../interfaces/IItinerary";
import { PlaceData } from "../../interfaces/IData";

const getItineraries = async () => {
  const response = await apiGet(`itinerary`);
  return response.data;
};

const getItinerary = async (itineraryId: string | number | undefined) => {
  const response = await apiGet(`itinerary/${itineraryId}/`);
  return response.data;
};

const createItinerary = async (itineraryItem: IItinerary | undefined) => {
  const data = itineraryItem;
  const response = await apiPost(`itinerary/`, data);
  return response.data;
};

const editItinerary = async (itineraryId: string | number | undefined, itineraryItem: IItinerary | undefined) => {
  const data = itineraryItem;
  const response = await apiPut(`itinerary/${itineraryId}/`, data);
  return response.data;
};

const deleteItinerary = async (itineraryId: string) => {
  const response = await apiDelete(`itinerary/${itineraryId}`);
  return response; // bc no data back?
};

const getPlace = async (placeId: string) => {
  const response = await apiGet(`places/${placeId}/`);
  return response.data;
};

const getDetailedItinerary = async (
  itineraryId: string | undefined
): Promise<IAgenda[]> => {
  const itinerary = await getItinerary(itineraryId);
  const plans = itinerary?.plan || [];
  const places: PlaceData[] = await Promise.all(
    plans.map((plan: any) => getPlace(plan.place_id))
  );

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
      location: [place?.latitude, place?.longitude],
      tags: [place?.category_description],
      date: plan?.date,
      arrival_time: plan?.arrival_time,
      leave_time: plan?.leave_time,
    };
  });
  return detailedItinerary;
};

const createBlankItinerary = async (
  destination: string,
  coTravellers: number[],
  startDate: string,
  endDate: string
): Promise<IItinerary> => {
  const profile = await getProfile()

  const blankItinerary = {
    owner: profile.id,
    co_travelers: coTravellers,
    destination: destination,
    plan: [],
    start_date: startDate,
    end_date: endDate,
    start_time: "08:00:00",
    end_time: "20:00:00",
  }

  const responseItinerary = await createItinerary(blankItinerary);
  return responseItinerary;
};

export {
  getItineraries,
  getItinerary,
  createItinerary,
  editItinerary,
  getPlace,
  deleteItinerary,
  getDetailedItinerary,
  createBlankItinerary,
};
