export interface QuestionData {
  key: string;
  label: string;
  optionsDisplays?: string[];
  display?: string;
  slider?: boolean;
  range?: [number, number];
  step?: number;
  parentKey?: string;
  grandparentKey?: string;
  options: string[];
  allowSelect: number | null;
  subQuestions?: Record<string, QuestionData[]>;
}

//["Schools", "Universities", "Libraries", "Museums"],
const questionData: QuestionData[] = [
  {
    key: "tripType",
    label: "What is kind of trip you are going for?",
    options: ["Fast-paced", "Medium", "Slow & easy"],
    allowSelect: 1,
  },
  {
    key: "targetTypes",
    label: "What is your target types of attraction for this trip?",
    options: [
      "educational",
      "historicalAndCulture",
      "nature",
      "religious",
      "marketAndShopping",
      "recreationalAndEntertainment",
      "chillout",
      "sportsAndAdventures",
    ],
    optionsDisplays: [
      "Educational",
      "Historical & Culture",
      "Nature",
      "Religious",
      "Market & Shopping",
      "Recreational & Entertainment",
      "Chillout",
      "Sports & Adventures",
    ],
    allowSelect: 3,
    subQuestions: {
      educational: [
        {
          key: "educational",
          parentKey: "targetTypes",
        
          display: "Educational",
          label: "Which attraction do you prefer for Educational?",
          options: [
            "Educational Places",
            "Royal Project, Research and Development",
            "Training Centers",
            "Museums",
            "Educational Museums",
            "Educational Gardens",
            "Libraries",
            "Zoos and Aquariums",
          ],
          allowSelect: 3,
        },
      ],
      historicalAndCulture: [
        {
          key: "historicalAndCulture",
          parentKey: "targetTypes",
          display: "Historical & Culture",
          label: "Which attraction do you prefer for Historical & Culture?",
          options: [
            "Art Galleries",
            "Royal Palace",
            "Art, Culture, Heritage & Architecture",
            "Archaeological",
            "World War II Sites",
            "Historical Sites & Monuments",
            "Suburban Living",
            "Historical Houses",
            "Village, Community",
            "Landmarks and Memorials",
            "Cultural Show, Cultural Performance",
            "Art & Craft Centres",
          ],
          allowSelect: 3,
        },
      ],
      nature: [
        {
          key: "nature",
          parentKey: "targetTypes",
          display: "Nature",
          label: "Which attraction do you prefer for Nature?",
          options: [
            "Nature & Wildlife",
            "Mountain (Doi)",
            "National Parks & Marine Reserves",
            "Islands",
            "Flower Field",
            "Caves",
            "Hot Spring",
            "Beaches & Bay",
            "Dam, Reservoir, Lake",
            "River, Canal",
            "Other Nature Sites",
            "Waterfalls",
            "Green Travel",
          ],
          allowSelect: 3,
        },
      ],
      religious: [
        {
          key: "religious",
          parentKey: "targetTypes",
          display: "Religious",
          label: "Which attraction do you prefer for Religious?",
          options: [
            "Churches",
            "Mosque",
            "Temple",
            "Other Religious & Spiritual Sites",
            "Places of Worship",
          ],
          allowSelect: 3,
        },
      ],
      marketAndShopping: [
        {
          key: "marketAndShopping",
          parentKey: "targetTypes",
          display: "Market & Shopping",
          label: "Which attraction do you prefer for Market & Shopping?",
          options: [
            "Floating Market",
            "Local Market",
            "Night Market",
            "Shopping",
          ],
          allowSelect: 3,
        },
      ],
      recreationalAndEntertainment: [
        {
          key: "recreationalAndEntertainment",
          parentKey: "targetTypes",
          display: "Recreational & Entertainment",
          label:
            "Which attraction do you prefer for Recreational & Entertainment?",
          options: [
            "Cinema",
            "Recreational & Entertainment",
            "Theater",
            "Concert Venue",
            "Wineries & Breweries",
            "Amusement Park",
            "Animal Camps and Shows",
          ],
          allowSelect: 3,
        },
      ],
      chillout: [
        {
          key: "chillout",
          parentKey: "targetTypes",
          display: "Chillout",
          label: "Which attraction do you prefer for Chillout?",
          options: ["Spas & Wellness", "Meditation", "Parks & Gardens"],
          allowSelect: 3,
        },
      ],
      sportsAndAdventures: [
        {
          key: "sportsAndAdventures",
          parentKey: "targetTypes",
          display: "Sports & Adventures",
          label: "Which attraction do you prefer for Sports & Adventures?",
          options: [
            "Golf Course",
            "Outdoor Activity and Adventure Sites",
            "Sports Venues",
            "Diving Site",
          ],
          allowSelect: 3,
        },
      ],
    },
  },
  {
    key: "preferredActivities",
    label: "What is your preferred activities?",
    options: [
      "physicalActivitiesSports",
      "natureAndOutdoorActivities",
      "culturalAndEducationalActivities",
      "relaxationAndWellness",
      "adventureAndExcitingActivities",
    ],
    optionsDisplays: [
      "Physical Activities/Sports",
      "Nature and Outdoor Activities",
      "Cultural and Educational Activities",
      "Relaxation and Wellness",
      "Adventure and Exciting Activities",
    ],
    allowSelect: 3,
    subQuestions: {
      physicalActivitiesSports: [
        {
          key: "physicalActivitiesSports",
          parentKey: "preferredActivities",
          display: "Physical Activities/Sports",
          label: "Which activity do you prefer for Physical Activities/Sports?",
          options: [
            "Exercise",
            "Jogging",
            "Ride a Bicycle",
            "Swimming",
            "Climbing",
            "Windsurfing",
            "Mountain Bike",
            "Canoeing",
            "Diving",
            "Kayaking",
            "Parachuting",
            "Bungee Jump",
            "Rappeling",
            "Trekking",
            "Rafting",
            "Fishing",
            "Jetski",
            "Boxing Stadium",
            "Watch the Thai Boxing",
            "Watch the Sport Competition",
            "Driving",
          ],
          allowSelect: 3,
        },
      ],
      natureAndOutdoorActivities: [
        {
          key: "natureAndOutdoorActivities",
          parentKey: "preferredActivities",
          display: "Nature and Outdoor Activities",
          label:
            "Which activity do you prefer for Nature and Outdoor Activities?",
          options: [
            "Nature",
            "See The Fireflies",
            "Birdwatching",
            "Picnic",
            "Beach Activity",
            "Camping",
            "Safari Tour",
            "See The Butterflies",
            "Afforest",
            "Coral",
            "Seagrass",
            "Park",
            "Sightseeing"
        ],
          allowSelect: 3,
        },
      ],
      culturalAndEducationalActivities: [
        {
          key: "culturalAndEducationalActivities",
          parentKey: "preferredActivities",
          display: "Cultural and Educational Activities",
          label:
            "Which activity do you prefer for Cultural and Educational Activities?",
          options: [
            "Learn The History",
            "Fine Arts",
            "Visit Art And Culture Exhibition",
            "Visit Museum",
            "First Teachers",
            "Architecture",
            "Library",
            "Reading",
            "Local Community Way",
            "Learn The Local Culture",
            "Watch The Cultural Performance",
            "Religious Activity"
        ],        
          allowSelect: 3,
        },
      ],
      relaxationAndWellness: [
        {
          key: "relaxationAndWellness",
          parentKey: "preferredActivities",
          display: "Relaxation and Wellness",
          label: "Which activity do you prefer for Relaxation and Wellness?",
          options: [
            "Meditation",
            "Praying",
            "Massage",
            "Mineral Water Spa",
            "Spa",
            "Medical Checkup",
            "Homestay"
        ],        
          allowSelect: 3,
        },
      ],
      adventureAndExcitingActivities: [
        {
          key: "adventureAndExcitingActivities",
          parentKey: "preferredActivities",
          display: "Adventure and Exciting Activities",
          label:
            "Which activity do you prefer for Adventure and Exciting Activities?",
          options: [
            "Amusement Park",
            "Farm Tourism",
            "Fishery",
            "Zipline",
            "Ride A Horse",
            "Ride An Elephant",
            "Dinner Cruising",
            "Waterpark",
            "Explore The Cave",
            "Visit The Planetarium",
            "Bath The Elephants",
            "Sailboat",
            "Black Mountain Waterpark"
        ],        
          allowSelect: 3,
        },
      ],
    },
  },
  {
    key: "preferredCuisine",
    label: "What is your preferred cuisine?",
    options: [
      "Thai",
      "Indian",
      "Italian",
      "Greek",
      "Chinese",
      "Spanish",
      "European",
      "French / Bistro",
      "Korean",
      "Mediterranean",
      "Japanese",
      "Asian",
      "American",
      "Vietnamese",
    ],
    allowSelect: 3,
  },
];

export const getQuestions = (): Promise<QuestionData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(questionData);
    }, 1000);
  });
};

export const getSubtypesForSelectedOptions = (
  selectedOptions: string[]
): QuestionData[] => {
  // Replace this with your actual logic to get subtypes.
  return [];
};
