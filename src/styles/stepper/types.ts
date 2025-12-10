export interface StepItem {
  label?: string;
}

export interface CustomStepperProps {
  steps: number | StepItem[];
  activeStep: number;
  onStepChange?: (step: number) => void;
  width?: string | number;
  className?: string;
}
