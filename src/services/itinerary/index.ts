import { apiGet, apiPost } from '../api';
import { getPlace, PlaceData } from '../place';

interface AgendaData {
  id: number;
  place_id: string;
  date: Date;
  arrival_time: Date;
  leave_time: Date;
  travel_time: object;
}

interface AgendaPlaceData {
  id: number;
  place: PlaceData;
  date: Date;
  arrival_time: Date;
  leave_time: Date;
  travel_time: object;
}

interface ItineraryData {
  id: number,
  destination: string,
  start_date: Date,
  end_date: Date,
  start_time: Date,
  end_time: Date,
  plan: AgendaData[];
  co_travelers: number[], 
  owner: number
}

interface ItineraryPlaceData {
  id: number,
  destination: string,
  start_date: Date,
  end_date: Date,
  start_time: Date,
  end_time: Date,
  plan: AgendaPlaceData[];
  co_travelers: number[], 
  owner: number
}

const getItinerary = async (itineraryId: string | undefined) => {
  if (itineraryId == undefined) {
    itineraryId = ""
  }
  // const itineraryData = [
  //   {
  //     id: 1,
  //     name: "Eiffel Tower",
  //     imageUrl: "https://www.fodors.com/assets/destinations/21/grand-palace-night-bangkok-thailand_980x650.jpg",
  //     description: "A dd-iron lattice tower on the Champ de Mars in Paris, France.A wrought-iron lattice tower on the Champ de Mars in Paris, France.A wrought-iron lattice tower on the Champ de Mars in Paris, France.A wrought-iron lattice tower on the Champ de Mars in Paris, France.",
  //     rating: 4.5,
  //     location: [13.7494, 100.5282],
  //     tags: ["landmark", "architecture"],
  //     date: "2023-04-01",
  //     time: "10:00 AM",
  //   },
  //   {
  //     id: 2,
  //     name: "Louvre Museum",
  //     imageUrl: "https://www.fodors.com/assets/destinations/21/grand-palace-night-bangkok-thailand_980x650.jpg",
  //     description: "The world's largest art museum and a historic monument in Paris, France.",
  //     rating: 4.7,
  //     location: [13.7441, 100.4941],
  //     tags: ["museum", "art"],
  //     date: "2023-04-01",
  //     time: "2:00 PM",
  //   },
  //   {
  //     id: 3,
  //     name: "Notre-Dame Cathedral",
  //     imageUrl: "https://www.fodors.com/assets/destinations/21/grand-palace-night-bangkok-thailand_980x650.jpg",
  //     description: "A medieval Catholic cathedral on the Île de la Cité in Paris, France.",
  //     rating: 4.6,
  //     location: [13.7581, 100.4917],
  //     tags: ["cathedral", "architecture"],
  //     date: "2023-04-02",
  //     time: "10:00 AM",
  //   },
  //   {
  //     id: 4,
  //     name: "Arc de Triomphe",
  //     imageUrl: "https://www.fodors.com/assets/destinations/21/grand-palace-night-bangkok-thailand_980x650.jpg",
  //     description: "One of the most famous monuments in Paris, France.",
  //     rating: 4.4,
  //     location: [13.7641, 100.4991],
  //     tags: ["monument", "history"],
  //     date: "2023-04-02",
  //     time: "2:00 PM",
  //   },
  //   {
  //     id: 5,
  //     name: "Arc de Triomphe",
  //     imageUrl: "https://www.fodors.com/assets/destinations/21/grand-palace-night-bangkok-thailand_980x650.jpg",
  //     description: "One of the most famous monuments in Paris, France.",
  //     rating: 4.4,
  //     location: [13.7499, 100.4916],
  //     tags: ["monument", "history"],
  //     date: "2023-04-09",
  //     time: "2:00 PM",
  //   },
  //   {
  //     id: 5,
  //     name: "Arc de Triomphe",
  //     imageUrl: "https://www.fodors.com/assets/destinations/21/grand-palace-night-bangkok-thailand_980x650.jpg",
  //     description: "One of the most famous monuments in Paris, France.",
  //     rating: 4.4,
  //     location: [13.7641, 100.4991],
  //     tags: ["monument", "history"],
  //     date: "2023-04-09",
  //     time: "2:00 PM",
  //   },
  // ];
  // return {
  //   status: 200,
  //   data: JSON.stringify(itineraryData)
  // }
  const response = await apiGet<ItineraryData>('/itinerary/'+itineraryId, 
    {
      headers: {
        Authorization: 'Bearer '+ localStorage.getItem('auth'),
      },
    })
    let iti:ItineraryPlaceData = {} as ItineraryPlaceData;
    let tempPlan: AgendaPlaceData[] = [];
    if (response.data != undefined) {
      response.data.plan.forEach(async agenda => {
        tempPlan.push( {
          id: agenda.id,
          place: JSON.parse((await getPlace(agenda.place_id)).data),
          date: agenda.date,
          arrival_time: agenda.arrival_time,
          leave_time: agenda.leave_time,
          travel_time: agenda.travel_time
        })
      });
      iti = {
        id: response.data.id,
        destination: response.data.destination,
        start_date: response.data.start_date,
        end_date: response.data.end_date,
        start_time: response.data.start_time,
        end_time: response.data.end_time,
        plan: tempPlan,
        co_travelers: response.data.co_travelers, 
        owner: response.data.owner
      }
      
    }
  console.log(iti)
  return {
    status: response.status,
    data: iti
  };
};

export {
  getItinerary
};
export type {
    ItineraryData,
    ItineraryPlaceData,
    AgendaData,
    AgendaPlaceData
  };
