import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Steps, Slider, Input, InputNumber } from "antd";
import "../index.scss";

const { Step } = Steps;

interface ModalProps {
  visible: boolean;
  onCancel: () => void;
}

interface QuestionData {
  label: string;
  slider?: boolean;
  range?: [number, number];
  step?: number;
  options?: string[];
}

const questionData: QuestionData[] = [
  {
    label: 'What is your budget for this trip?',
    slider: true,
    range: [0, 10000],
    step: 500,
  },
  {
    label: 'What is kind of trip you are going for?',
    options: ['Fast-paced', 'Medium', 'Slow & easy'],
  },
  {
    label: 'What is your target types of attraction for this trip?',
    options: ['Educational', 'Historical', 'Market & Shopping', 'Nature', 'Recreational & Entertainment', 'Chillout', 'Cultural', 'Sport'],
  },
  {
    label: 'What is your preferred activities?',
    options: ['Educational Activities', 'Extreme Sports ', 'Shopping', 'Religious Activities', 'Sports', 'Nature Sightseeing', 'Cultural Activities', 'Relaxing'],
  },
  {
    label: 'What is your preferred cuisine?',
    options: ['Japanese', 'Italian', 'Mediterranean', 'Thai', 'Indian', 'French / Bistro', 'Chinese', 'Spanish', 'Random'],
  },
  {
    label: 'What is your (or person in a group) diet restriction?',
    options: ['Halal', 'Vegetarian', 'Vegan', 'Allergies'],
  },
];

const QuestionModal: React.FC<ModalProps> = ({ visible, onCancel }) => {
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]); // new state to store selected options for each question
  // const currentQuestion = questionData[currentStep];
  const [sliderInputMinValue, setSliderInputMinValue] = useState(20);
  const [sliderInputMaxValue, setSliderInputMaxValue] = useState(50);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleOptionSelect = (option: any ) => {
    const selected = [...selectedOptions];
    if (selected.includes(option)) {
      // deselect option if already selected
      const index = selected.indexOf(option);
      selected.splice(index, 1);
    } else {
      // select option if not already selected
      selected.push(option);
    }
    setSelectedOptions(selected);
  };

  const handleSubmit = () => {
    // do something with the selected options, e.g. send them to a server
    let resultArray = [[sliderInputMinValue, sliderInputMaxValue], ...selectedOptions]
    console.log(resultArray);
    alert(resultArray);
    onCancel();
    navigate('/itinerary/001');
  };

  const handleSliderAfterChange = (value: number | [number, number]) => {
    // handleOptionSelect(value)
    console.log('onAfterChange: ', value); 
  };
  
  return (
    <Modal
      className="question-modal"
      title={
        <div className="question-modal-header">
          <a href="/" style={{ textDecoration: 'none' }}>
            <h2 style={{ color: 'var(--color-white)', fontFamily: 'Montserrat-ExtraBold' }}>
              ITER
            </h2>
          </a>
          <Steps size="small" current={currentStep} responsive={false}>
            {questionData.map((question, index) => (
              <Step key={index} />
            ))}
          </Steps>
        </div>
      }
      visible={visible}
      centered
      onCancel={onCancel}
      footer={
        <>
          {currentStep > 0 && (
            <Button onClick={handlePrev} className="question-modal-btn">
              Previous
            </Button>
          )}
          {currentStep < questionData.length - 1 ? (
            <Button onClick={handleNext} className="question-modal-btn">
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="question-modal-btn">
              Submit
            </Button>
          )}
        </>
      }
    >
      <div className="question-modal-content">
        <h4 style={{ color: 'var(--color-black)' }}>{questionData[currentStep].label}</h4>
        {questionData[currentStep].slider ? (
          <div className="question-modal-slider">
            <div style={{ display: 'flex', alignItems: 'center'}}>
            Price range:
              <Input
                prefix="$"
                suffix="k"
                style={{ margin: '0 16px', width: '75px'}}
                value={sliderInputMinValue}
                onChange={(e)=>{ setSliderInputMinValue(Number(e.target.value))}}
              />
              -
              <Input
                prefix="$"
                suffix="k"
                style={{ margin: '0 16px', width: '75px'}}
                value={sliderInputMaxValue}
                onChange={(e)=>{ setSliderInputMaxValue(Number(e.target.value))}}
              />
            </div>
            <Slider
              range
              value={[sliderInputMinValue, sliderInputMaxValue]}
              onChange={(newValue) => { 
                setSliderInputMinValue(newValue[0])
                setSliderInputMaxValue(newValue[1])
              }}
              style={{ margin: '20px 16px' }}
              onAfterChange={handleSliderAfterChange}
            />
          </div>
        ) : (
          <div className="question-modal-answers">
            {questionData[currentStep].options?.map((option, index) => (
              <Button 
                type={selectedOptions.includes(option) ? "primary" : "default"} // set button type to primary if option is selected
                key={index} 
                className="question-modal-answer-btn" 
                onClick={() => handleOptionSelect(option)} // handle option selection
              >
                {option}
              </Button>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};

      
export default QuestionModal;

// const renderAnswerOptions = () => {
//   if (currentQuestion.slider) {
//     // Render a slider component for a slider question
//     return <div>Render slider component here</div>;
//   } else if (currentQuestion.options) {
//     // Render a list of answer options for a multiple-choice question
//     return currentQuestion.options.map((option, index) => (
//       <Button type="primary" key={index} className="question-modal-answer-btn">
//         {option}
//       </Button>
//     ));
//   } else {
//     // Render a text input component for a short-answer question
//     return <div>Render text input component here</div>;
//   }
// };