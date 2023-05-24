import { apiGet, apiPost, apiDelete } from '../api';

const getItinerary = async (itineraryId: string | undefined) => {
    const response = await apiGet(`itinerary/${itineraryId}`);
    return response;
  };
  
  const getPlace = async (placeId: string) => {
    const response = await apiGet(`places/${placeId}`);
    return response;
  };


export {
    getItinerary,
    getPlace,

  };
  