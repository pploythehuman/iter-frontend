import { apiGet, apiPost, apiDelete } from "../api";
import { getProfile } from "../profile";
import { IAgenda, IItinerary } from "../../interfaces/IItinerary";
import { PlaceData, AgendaData } from "../../interfaces/IData";
import { getItinerary, editItinerary } from "../../services/itinerary";

const getAgenda = async (agendaId: string | number | undefined) => {
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

const deleteAgenda = async (agendaId: string | number | undefined, itineraryId: string | number | undefined) => {
  const deletedAgenda = await getAgenda(agendaId);
  const response = await apiDelete(`itinerary/agendas/${agendaId}/`);

  // update itinerary date
  const itinerary = await getItinerary(itineraryId);
  if (new Date(deletedAgenda.date) <= new Date(itinerary.start_date) || new Date(deletedAgenda.date) >= new Date(itinerary.end_date)) {
    const updatedItinerary = await getItinerary(itineraryId);
    const remainingAgendas = updatedItinerary.plan;

    if (remainingAgendas.length === 0) {
      return response;
    }
    const dates = remainingAgendas.map((agenda: AgendaData) => new Date(agenda.date));
    const newStartDate = new Date(Math.min(...dates)).toISOString().split('T')[0];
    const newEndDate = new Date(Math.max(...dates)).toISOString().split('T')[0];
    const newItinerary = {
      ...updatedItinerary,
      start_date: newStartDate,
      end_date: newEndDate,
    };
    await editItinerary(itineraryId, newItinerary);
  }

  return response;
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

export { getAgenda, deleteAgenda, createAgenda, createAndAddAgenda };
