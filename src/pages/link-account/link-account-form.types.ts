import { LinkAccountInputs } from './link-account-form.schema';

export interface LinkAccountFormProps {
  onSubmit: (data: LinkAccountInputs[]) => void;
  onBack: () => void;
  defaultValues?: LinkAccountInputs[];
}
