export interface QuestionData {
  label: string;
  slider?: boolean;
  range?: [number, number];
  step?: number;
  options?: string[];
  allowSelect: number | null;
}

const questionData: QuestionData[] = [
  // {
  //   label: 'What is your budget for this trip?',
  //   slider: true,
  //   range: [0, 10000],
  //   step: 500,
  // },
  {
    label: 'What is kind of trip you are going for?',
    options: ['Fast-paced', 'Medium', 'Slow & easy'],
    allowSelect: 1,
  },
  {
    label: 'What is your target types of attraction for this trip?',
    options: ['Educational', 'Historical & Culture', 'Nature', 'Religious', 'Market & Shopping', 'Recreational & Entertainment', 'Chillout', 'Sports & Adventures'],
    allowSelect: 3,
  },
  {
    label: 'What is your preferred activities?',
    options: ['Educational Places', 'Royal Project Research and Development', 'Training Centers', 'Museums', 'Educational Museums', 'Educational Gardens', 'Libraries', 'Zoos and Aquariums'],
    allowSelect: null,
  },
  {
    label: 'What is your preferred cuisine?',
    options: ['Japanese', 'Italian', 'Mediterranean', 'Thai', 'Indian', 'French / Bistro', 'Chinese', 'Spanish', 'Random'],
    allowSelect: null,
  },
  // {
  //   label: 'What is your (or person in a group) diet restriction?',
  //   options: ['Halal', 'Vegetarian', 'Vegan', 'Allergies'],
  //   allowSelect: null,
  // },
];

export const getQuestions = (): Promise<QuestionData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(questionData);
    }, 1000);
  });
};