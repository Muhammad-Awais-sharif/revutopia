import { useState } from 'react';
import { ContactDetailsForm } from '../contact-details/contact-details-form.component';
import { LinkAccountForm } from '../link-account/link-account-form.component';
import { FormSteps } from '../../components/form-steps/form-steps.component';
import type { FormData } from '../../schemas/form.schema';
import { ContactDetailsInputs } from '../contact-details/contact-details-form.schema';
import { LinkAccountInputs } from '../link-account/link-account-form.schema';
import { BusinessInfoInputs } from '../business-info/business-info-form.schema';
import { User } from '../access-permissions/components/users-list.component';
import { AccessPermissionsInputs } from '../access-permissions/access-permissions-form.schema';
import { BusinessInfoForm } from '../business-info/business-info-form.component';
import { AccessPermissionsForm } from '../access-permissions/access-permissions-form.component';

const initialFormData = {
  businessInfo: {} as BusinessInfoInputs,
  contactDetails: {} as ContactDetailsInputs,
  linkAccounts: [] as LinkAccountInputs[],
  accessPermissions: {
    users: [] as User[],
    settings: { advancedEnabled: false },
  } as AccessPermissionsInputs,
};

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const steps = [
    { id: 1, name: 'Business Info', completed: currentStep > 1 },
    { id: 2, name: 'Contact details', completed: currentStep > 2 },
    { id: 3, name: 'Link Account', completed: currentStep > 3 },
    {
      id: 4,
      name: 'Access and Permissions',
      completed: currentStep > 4,
      active: currentStep === 4,
    },
  ];

  const handleBusinessInfoSubmit = (data: BusinessInfoInputs) => {
    setFormData((prev) => ({ ...prev, businessInfo: data }));
    setCurrentStep(2);
  };

  const handleContactDetailsSubmit = (data: ContactDetailsInputs) => {
    setFormData((prev) => ({ ...prev, contactDetails: data }));
    setCurrentStep(3);
  };

  const handleLinkAccountSubmit = (data: LinkAccountInputs[]) => {
    setFormData((prev) => ({ ...prev, linkAccounts: data }));
    setCurrentStep(4);
  };

  const handleFinalSubmit = (data: AccessPermissionsInputs) => {
    setFormData((prev) => ({ ...prev, accessPermissions: data }));
    setCurrentStep(1);

    const finalData: FormData = {
      ...formData,
      accessPermissions: data,
    };

    console.log('Final Form Data:', finalData);

    setFormData(initialFormData);

    setCurrentStep(1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  return (
    <>
      <div className="w-full max-w-[745px]">
        <FormSteps steps={steps} />
      </div>

      <div className="w-full max-w-[746px] bg-white rounded-[10px] border border-solid border-[#e6e9fa] shadow-[0px_4px_4px_#0000001a] p-10">
        {currentStep === 1 && (
          <BusinessInfoForm
            onSubmit={handleBusinessInfoSubmit}
            defaultValues={formData.businessInfo}
          />
        )}
        {currentStep === 2 && (
          <ContactDetailsForm
            onSubmit={handleContactDetailsSubmit}
            onBack={handleBack}
            defaultValues={formData.contactDetails}
          />
        )}
        {currentStep === 3 && (
          <LinkAccountForm
            onSubmit={handleLinkAccountSubmit}
            onBack={handleBack}
            defaultValues={formData.linkAccounts}
          />
        )}
        {currentStep === 4 && (
          <AccessPermissionsForm
            onSubmit={handleFinalSubmit}
            defaultValues={formData.accessPermissions}
          />
        )}
      </div>
    </>
  );
}
