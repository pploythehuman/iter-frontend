export interface QuestionData {
  key: string;
  label: string;
  slider?: boolean;
  range?: [number, number];
  step?: number;
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
    key: "topicTargetTypes",
    label: "What is your target types of attraction for this trip?",
    options: [
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
          key: "Educational",
          label: "Which attraction do you prefer for Educational?",
          options: ["Educational Places", "Royal Project, Research and Development", "Training Centers", "Museums"],
          allowSelect: 2,
        },
      ],
      historicalAndCulture: [
        {
          key: "Historical & Culture",
          label: "Which attraction do you prefer for Historical & Culture?",
          options: ["Art Galleries", "Royal Palace", "Art, Culture, Heritage & Architecture", "Archaeological"],
          allowSelect: 2,
        },
      ],
      nature: [
        {
          key: "Nature",
          label: "Which attraction do you prefer for Nature?",
          options: ["Nature & Wildlife", "Mountain (Doi)", "National Parks & Marine Reserves", "Islands"],
          allowSelect: 2,
        },
      ],
      religious: [
        {
          key: "Religious",
          label: "Which attraction do you prefer for Religious?",
          options: ["Churches", "Mosque", "Temple", "Other Religious & Spiritual Sites"],
          allowSelect: 2,
        },
      ],
      marketAndShopping: [
        {
          key: "Market & Shopping",
          label: "Which attraction do you prefer for Market & Shopping?",
          options: ["Floating Market", "Local Market", "Night Market", "Shopping"],
          allowSelect: 2,
        },
      ],
      recreationalAndEntertainment: [
        {
          key: "Recreational & Entertainment",
          label: "Which attraction do you prefer for Recreational & Entertainment?",
          options: ["Cinema", "Recreational & Entertainment", "Theater", "Concert Venue"],
          allowSelect: 2,
        },
      ],
      chillout: [
        {
          key: "Chillout",
          label: "Which attraction do you prefer for Chillout?",
          options: ["Spas & Wellness", "Meditation", "Parks & Gardens"],
          allowSelect: 2,
        },
      ],
      sportsAndAdventures: [
        {
          key: "Sports & Adventures",
          label: "Which attraction do you prefer for Sports & Adventures?",
          options: ["Golf Course", "Outdoor Activity and Adventure Sites", "Sports Venues", "Diving Site"],
          allowSelect: 2,
        },
      ],
    },
  },
  {
    key: "preferredActivities",
    label: "What is your preferred activities?",
    options: [
      "Educational Places",
      "Royal Project Research and Development",
      "Training Centers",
      "Museums",
      "Educational Museums",
      "Educational Gardens",
      "Libraries",
      "Zoos and Aquariums",
    ],
    allowSelect: null,
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
    allowSelect: null,
  },
];

export const getQuestions = (): Promise<QuestionData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(questionData);
    }, 1000);
  });
};

export const getSubtypesForSelectedOptions = (selectedOptions: string[]): QuestionData[] => {
  // Replace this with your actual logic to get subtypes.
  return [];
}