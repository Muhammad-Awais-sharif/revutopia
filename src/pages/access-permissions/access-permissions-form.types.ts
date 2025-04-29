import { AccessPermissionsInputs } from './access-permissions-form.schema';

export interface AccessPermissionsFormProps {
  onSubmit: (data: AccessPermissionsInputs) => void;
  defaultValues?: Partial<AccessPermissionsInputs>;
}

export interface Person {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Manager';
  avatar?: string;
  status?: 'active' | 'pending';
  isPrimaryOwner?: boolean;
}
