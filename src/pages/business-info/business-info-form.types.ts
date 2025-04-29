import { BusinessInfoInputs } from './business-info-form.schema';

export interface BusinessInfoFormProps {
  onSubmit: (data: BusinessInfoInputs) => void;
  defaultValues?: Partial<BusinessInfoInputs>;
}
