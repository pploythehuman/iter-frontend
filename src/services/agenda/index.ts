import { apiGet, apiPost, apiDelete } from "../api";
import { getProfile } from "../profile";
import { IAgenda, IItinerary } from "../../interfaces/IItinerary";
import { PlaceData, AgendaData } from "../../interfaces/IData";
import { getItinerary, editItinerary } from "../../services/itinerary";

const getAgenda = async (agendaId: string | undefined) => {
  const response = await apiGet(`itinerary/agendas/${agendaId}/`);
  return response.data;
};

const createAgenda = async (
  placeId: string,
  travelTime: { [key: string]: number },
  date: string,
  arrivalTime: string,
  leaveTime: string
) => {
  const newAgenda: AgendaData = {
    place_id: placeId,
    travel_time: travelTime,
    date: date,
    arrival_time: arrivalTime,
    leave_time: leaveTime,
  };

  const response = await apiPost(`itinerary/agendas/`, newAgenda);
  return response.data;
};

const createAndAddAgenda = async (
  placeId: string,
  travelTime: { [key: string]: number },
  date: string,
  arrivalTime: string,
  leaveTime: string,
  itineraryId: number | string | undefined,
) => {
  const newAgenda = await createAgenda(
    placeId,
    travelTime,
    date,
    arrivalTime,
    leaveTime
  );
  const itineraryItem = await getItinerary(itineraryId)
  const updatedItinerary = {
    ...itineraryItem,
    start_date:
      new Date(itineraryItem.start_date) > new Date(newAgenda.date)
        ? newAgenda.date
        : itineraryItem.start_date,
    end_date:
      new Date(itineraryItem.end_date) < new Date(newAgenda.date)
        ? newAgenda.date
        : itineraryItem.end_date,
    plan: [...itineraryItem.plan, newAgenda],
  };

  const response = await editItinerary(itineraryId, updatedItinerary);
  return response;
};

export { getAgenda, createAgenda, createAndAddAgenda };
