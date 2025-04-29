export interface Step {
  id: number;
  name: string;
  completed: boolean;
  active?: boolean;
}

export interface FormStepsProps {
  steps: Step[];
}
