import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../components/ui/button/button.component';
import { StyledInput } from '../../components/ui/styled-input/styled-input.component';
import { ArrowLeft, Mail, Phone, User } from 'lucide-react';
import { ContactDetailsFormProps } from './contact-details-form.types';
import {
  ContactDetailsInputs,
  contactDetailsSchema,
} from './contact-details-form.schema';

export function ContactDetailsForm({
  onSubmit,
  onBack,
  defaultValues,
}: ContactDetailsFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactDetailsInputs>({
    resolver: zodResolver(contactDetailsSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-[#2A9D8F]" />
          </button>
          <h2 className="text-2xl font-semibold text-[#333]">
            Contact details
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <StyledInput
            {...register('firstName')}
            label="Primary Contact Name"
            required
            icon={<User className="h-5 w-5 text-[#7C8BA0]" />}
            error={errors.firstName?.message}
          />

          <StyledInput
            {...register('email')}
            label="Primary Contact Email"
            required
            type="email"
            icon={<Mail className="h-5 w-5 text-[#7C8BA0]" />}
            error={errors.email?.message}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <StyledInput
            {...register('phone')}
            label="Contact Number"
            required
            icon={<Phone className="h-5 w-5 text-[#7C8BA0]" />}
            error={errors.phone?.message}
          />

          <StyledInput
            {...register('landline')}
            label="Landline (Optional)"
            icon={<Phone className="h-5 w-5 text-[#7C8BA0]" />}
            error={errors.landline?.message}
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-[#2A9D8F] text-white hover:bg-[#238276]"
      >
        Continue
      </Button>
    </form>
  );
}
