import { apiGet, apiPost } from '../api';


interface AgendaData {
  place_id: string;
  arrival_time: Date;
  leave_time: Date;
  travel_time: string;

}

interface ItineraryData {
  destination: string,
  start_date: Date,
  end_date: Date,
  start_time: Date,
  end_time: Date,
  plan: [AgendaData];
  co_travelers: [number], 
  owner: number
}

const getItinerary = async (itineraryId: string | undefined) => {
  if (itineraryId == undefined) {
    itineraryId = ""
  }
  const itineraryData = [
    {
      id: 1,
      name: "Eiffel Tower",
      imageUrl: "https://www.fodors.com/assets/destinations/21/grand-palace-night-bangkok-thailand_980x650.jpg",
      description: "A dd-iron lattice tower on the Champ de Mars in Paris, France.A wrought-iron lattice tower on the Champ de Mars in Paris, France.A wrought-iron lattice tower on the Champ de Mars in Paris, France.A wrought-iron lattice tower on the Champ de Mars in Paris, France.",
      rating: 4.5,
      location: [13.7494, 100.5282],
      tags: ["landmark", "architecture"],
      date: "2023-04-01",
      time: "10:00 AM",
    },
    {
      id: 2,
      name: "Louvre Museum",
      imageUrl: "https://www.fodors.com/assets/destinations/21/grand-palace-night-bangkok-thailand_980x650.jpg",
      description: "The world's largest art museum and a historic monument in Paris, France.",
      rating: 4.7,
      location: [13.7441, 100.4941],
      tags: ["museum", "art"],
      date: "2023-04-01",
      time: "2:00 PM",
    },
    {
      id: 3,
      name: "Notre-Dame Cathedral",
      imageUrl: "https://www.fodors.com/assets/destinations/21/grand-palace-night-bangkok-thailand_980x650.jpg",
      description: "A medieval Catholic cathedral on the Île de la Cité in Paris, France.",
      rating: 4.6,
      location: [13.7581, 100.4917],
      tags: ["cathedral", "architecture"],
      date: "2023-04-02",
      time: "10:00 AM",
    },
    {
      id: 4,
      name: "Arc de Triomphe",
      imageUrl: "https://www.fodors.com/assets/destinations/21/grand-palace-night-bangkok-thailand_980x650.jpg",
      description: "One of the most famous monuments in Paris, France.",
      rating: 4.4,
      location: [13.7641, 100.4991],
      tags: ["monument", "history"],
      date: "2023-04-02",
      time: "2:00 PM",
    },
    {
      id: 5,
      name: "Arc de Triomphe",
      imageUrl: "https://www.fodors.com/assets/destinations/21/grand-palace-night-bangkok-thailand_980x650.jpg",
      description: "One of the most famous monuments in Paris, France.",
      rating: 4.4,
      location: [13.7499, 100.4916],
      tags: ["monument", "history"],
      date: "2023-04-09",
      time: "2:00 PM",
    },
    {
      id: 5,
      name: "Arc de Triomphe",
      imageUrl: "https://www.fodors.com/assets/destinations/21/grand-palace-night-bangkok-thailand_980x650.jpg",
      description: "One of the most famous monuments in Paris, France.",
      rating: 4.4,
      location: [13.7641, 100.4991],
      tags: ["monument", "history"],
      date: "2023-04-09",
      time: "2:00 PM",
    },
  ];
  return {
    status: 200,
    data: JSON.stringify(itineraryData)
  }
  // const response = await apiGet<ItineraryData>('/itinerary/'+itineraryId, 
  //   {
  //     headers: {
  //       Authorization: 'Bearer '+ localStorage.getItem('auth'),
  //     },
  //   })
  // return {
  //   status: response.status,
  //   data: JSON.stringify(response.data)
  // };
};

export {
  getItinerary,
};