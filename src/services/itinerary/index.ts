import { apiGet, apiPost, apiDelete, apiPut } from "../api";
import { getProfile } from '../profile';
import { IAgenda, IItinerary } from "../../interfaces/IItinerary";
import { PlaceData } from "../../interfaces/IData";
import { getPlace } from '../../services/place';
import axios from 'axios';

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

// const getPlace = async (placeId: string) => {
//   const response = await apiGet(`places/${placeId}/`);
//   return response.data;
// };

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

const createRecommendedItinerary = async (
  destination: string,
  coTravellers: number[],
  start_date: string,
  end_date: string,
  tripType: any,
  targetTypes: any,
  preferredActivities: any,
  preferredCuisine: any,
): Promise<any> => {
  const profile = await getProfile()
  const data = {
    destination: destination,
      start_date: start_date,
      end_date: end_date,
      co_travelers: coTravellers,
      start_time: '08:00:00',
      end_time: '19:00:00',
      tripType: tripType,
      targetTypes: targetTypes,
      preferredActivities: preferredActivities,
      preferredCuisine: preferredCuisine,
      owner: profile.id
  }

  const data_2 = {
    "destination": "BANGKOK",
    "start_date":"2023-07-11",
    "end_date":"2023-07-15",
    "start_time":"08:00:00",
    "end_time":"19:00:00",
    "tripType":"Fast",
    "targetTypes": [
        "Educational Places",
        "Museums",
        "Training Centers",
        "Art Galleries",
        "Royal Palace",
        "Archaeological",
        "Local Market"
    ],
    "preferredActivities": [
        "Jogging",
        "Swimming",
        "Massage"
    ],
    "preferredCuisine": [
        "Greek",
        "Italian"
    ],
    "co_travelers": [1], 
    "owner": 3 
}
  console.log("this data", data);
  const response = await axios.post('http://dev.se.kmitl.ac.th:3200/api/recommenditinerary/', data);
  console.log("recc res", response);
  const itinerary = await createItinerary(response.data);
  console.log("itinerary", itinerary);
  return itinerary;
};

export {
  getItineraries,
  getItinerary,
  createItinerary,
  editItinerary,
  deleteItinerary,
  getDetailedItinerary,
  createBlankItinerary,
  createRecommendedItinerary
};
