import React, { useState } from "react";
import { Modal, Button, Steps } from "antd";
import "../index.scss";

const { Step } = Steps;

interface ModalProps {
  visible: boolean;
  onCancel: () => void;
}

const questionData = [
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
    label: ' What is your target types of attraction for this trip?',
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
    label: 'What is your(or person in a group) diet restriction?',
    options: ['Halal', 'Vegetarian', 'Vegan', 'Allergies'],
  },
];

const QuestionModal: React.FC<ModalProps> = ({ visible, onCancel }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
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
            <Step />
            <Step />
            <Step />
            <Step />
            <Step />
            <Step />
            <Step />
          </Steps>
        </div>
      }
      visible={visible}
      onCancel={onCancel}
      footer={
        <>
          {currentStep > 0 && (
            <Button onClick={handlePrev} className="question-modal-btn">
              Previous
            </Button>
          )}
          {currentStep < 2 ? (
            <Button onClick={handleNext} className="question-modal-btn">
              Next
            </Button>
          ) : (
            <Button onClick={onCancel} className="question-modal-btn">
              Submit
            </Button>
          )}
        </>
      }
    >
      <div className="question-modal-content">
        <h3 style={{ color: 'var(--color-black)' }}>Question {currentStep + 1}</h3>
        <p style={{ margin: '0px' }}>What is the answer to this question?</p>
        <div className="question-modal-answers">
          <Button className="question-modal-answer-btn">Answer 1</Button>
          <Button className="question-modal-answer-btn">Answer 2</Button>
          <Button className="question-modal-answer-btn">Answer 3</Button>
        </div>
      </div>
    </Modal>
  );
};

export default QuestionModal;
