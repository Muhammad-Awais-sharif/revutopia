import { ContactDetailsInputs } from './contact-details-form.schema';

export interface ContactDetailsFormProps {
  onSubmit: (data: ContactDetailsInputs) => void;
  onBack: () => void;
  defaultValues?: Partial<ContactDetailsInputs>;
}
