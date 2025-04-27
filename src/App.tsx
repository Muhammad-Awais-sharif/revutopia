import { useState } from "react";
import { BusinessInfoForm } from "./components/BusinessInfoForm";
import { ContactDetailsForm } from "./components/ContactDetailsForm";
import { LinkAccountForm } from "./components/LinkAccountForm";
import { FormSteps } from "./components/FormSteps";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import type { BusinessInfoInputs, ContactDetailsInputs, FormData, LinkAccountInputs } from "./lib/schema";

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    businessInfo: {} as BusinessInfoInputs,
    contactDetails: {} as ContactDetailsInputs,
    linkAccounts: [] as LinkAccountInputs[],
  });

  const steps = [
    { id: 1, name: "Business Info", completed: currentStep > 1 },
    { id: 2, name: "Contact details", completed: currentStep > 2 },
    { id: 3, name: "Link Account", completed: currentStep > 3, active: currentStep === 3 },
    { id: 4, name: "Access and Permissions", completed: currentStep > 4 },
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
    console.log("Complete form data:", formData);
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1 flex flex-col items-center gap-[35px] py-8">
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
        </div>
      </main>

      <Footer />
    </div>
  );
}