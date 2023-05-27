import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Steps, Slider, Input, InputNumber } from "antd";

import "../index.scss";
import { QuestionData, getQuestions } from '../data/question';
 
const { Step } = Steps;

interface ModalProps {
  visible: boolean;
  onCancel: () => void;
}

const QuestionModal: React.FC<ModalProps> = ({ visible, onCancel }) => {
  const navigate = useNavigate();
  const [questionData, setQuestionData] = useState<QuestionData[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedOptions, setSelectedOptions] = useState<string[][]>([]);
  // const currentQuestion = questionData[currentStep];
  const [sliderInputMinValue, setSliderInputMinValue] = useState(20);
  const [sliderInputMaxValue, setSliderInputMaxValue] = useState(50);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleOptionSelect = (option: string) => {
    let selected = selectedOptions[currentStep] ? [...selectedOptions[currentStep]] : []; // get selected options
    const currentQuestion = questionData[currentStep]; // get current question
  
    if (currentQuestion !== undefined) {
      const allowSelect = currentQuestion.allowSelect !== null ? currentQuestion.allowSelect : Infinity;
      if (selected.includes(option)) { // deselect option if already selected
        const index = selected.indexOf(option);
        selected.splice(index, 1);
      } else if (allowSelect === 1) { // replace current selection with the new choice
        selected = [option];
      } else if (selected.length < allowSelect) { // select new option
        selected.push(option);
      }
    }
  
    const updatedOptions = [...selectedOptions];
    updatedOptions[currentStep] = selected;
    setSelectedOptions(updatedOptions);
  };
  

  const handleSubmit = () => {
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

  useEffect(() => {
    const fetchData = async () => {
      setQuestionData(await getQuestions());
    }
    fetchData();
  }, [])
  
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
        <h4 style={{ color: 'var(--color-black)' }}>{questionData[currentStep]?.label}</h4>
        {questionData[currentStep]?.slider ? (
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
            {questionData[currentStep]?.options?.map((option, index) => (
              <Button 
                type={selectedOptions[currentStep]?.includes(option) ? "primary" : "default"} 
                key={index} 
                className="question-modal-answer-btn" 
                onClick={() => handleOptionSelect(option)}
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