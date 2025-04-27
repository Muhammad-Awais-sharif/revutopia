import { ChevronRightIcon } from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

export const SetupWizardFor = (): JSX.Element => {
  // Step data for the wizard
  const steps = [
    { id: 1, name: "Business Info", completed: true },
    { id: 2, name: "Contact details", completed: true },
    { id: 3, name: "Link Account", completed: true, active: true },
    { id: 4, name: "Access and Permissions", completed: true },
  ];

  // Access options data
  const accessOptions = [
    {
      id: 1,
      title: "People and access",
      description: "Add, edit or remove people's access",
      active: true,
    },
    {
      id: 2,
      title: "Advanced settings",
      description:
        "See profile ID and manage labels, shop codes and other settings",
      active: false,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen items-center gap-[35px] bg-white">
      {/* Header */}
      <header className="flex h-20 items-center justify-between px-[60px] py-5 w-full bg-white border-b border-[#e6e9fa]">
        <img
          className="w-[165px] h-[52px] object-cover"
          alt="Logo"
          src="/logo.png"
        />

        <div className="flex items-center justify-end gap-10">
          {/* Theme Toggle */}
          <div className="flex w-14 items-center gap-2.5 p-[3px] bg-[#f7f5fa] rounded-[32px] overflow-hidden">
            <div className="w-6 h-6 bg-white rounded-3xl overflow-hidden shadow-[0px_2px_4px_#00000033,inset_0px_-1px_1px_#0000001a,inset_0px_2px_2px_#ffffff]">
              <div className="w-4 h-4 mt-1 ml-1 bg-[url(/sun.png)] bg-[100%_100%]" />
            </div>
          </div>

          {/* Language Selector */}
          <div className="flex w-[145px] items-center gap-[30px]">
            <div className="flex w-[91px] items-center gap-2.5">
              <div className="w-[57px] font-['Poppins',Helvetica] font-normal text-black text-sm leading-[22px]">
                English
              </div>

              <div className="w-6 h-6">
                <img
                  className="w-5 h-5 mt-0.5 ml-px"
                  alt="Chevron down"
                  src="/chevron-down--2--1.svg"
                />
              </div>
            </div>

            <img
              className="w-6 h-6"
              alt="Question line"
              src="/question-line.svg"
            />
          </div>

          {/* User Profile */}
          <div className="w-[181px] h-[46px]">
            <div className="relative w-[181px] h-[46px]">
              <div className="absolute w-[75px] h-[46px] top-0 right-0">
                <div className="absolute w-[45px] h-[46px] top-0 left-0 bg-[url(/ellipse-2824.png)] bg-cover bg-[50%_50%]" />

                <img
                  className="absolute w-5 h-5 top-[13px] left-[55px]"
                  alt="Chevron down"
                  src="/chevron-down--2--1.svg"
                />
              </div>

              <div className="absolute w-[105px] h-[34px] top-1.5 left-0">
                <div className="absolute w-[101px] top-0 left-0 font-['Poppins',Helvetica] font-normal text-[#3a4053] text-sm leading-5">
                  Thomas Anree
                </div>

                <div className="absolute w-11 top-5 left-8 font-['Poppins',Helvetica] font-normal text-[#7c8ba0] text-xs leading-[14px]">
                  Admin
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="flex flex-col w-full max-w-[745px] items-center gap-5">
        <div className="flex w-full items-center">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="flex flex-col items-start gap-2.5 flex-1"
            >
              <div className="flex flex-col items-center justify-center gap-2 w-full">
                {/* Step Indicator Line */}
                <div className="flex items-start w-full">
                  <div className="inline-flex items-center justify-center">
                    <img
                      className="w-4 h-4"
                      alt="Indicator"
                      src="/-indicator.svg"
                    />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex h-4 items-center flex-1">
                      <div className="flex items-start flex-1 rotate-180">
                        <div className="flex-1 h-0.5 bg-[#2a9d8f] rotate-180" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Step Name */}
                <div className="flex items-center w-full">
                  <div
                    className={`w-fit font-['Poppins',Helvetica] ${step.active ? "font-medium" : "font-normal"} text-[#2a9d8f] text-base text-center leading-[18px] whitespace-nowrap`}
                  >
                    {step.name}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Card */}
      <Card className="w-full max-w-[746px] bg-white rounded-[10px] border border-solid border-[#e6e9fa] shadow-[0px_4px_4px_#0000001a]">
        <CardContent className="p-10">
          <div className="flex flex-col w-full items-start gap-4">
            {/* Card Title */}
            <div className="flex flex-col items-start gap-7 w-full">
              <div className="flex flex-col items-start gap-2">
                <div className="font-basic-size font-[number:var(--basic-size-font-weight)] text-[#3a4053] text-[length:var(--basic-size-font-size)] tracking-[var(--basic-size-letter-spacing)] leading-[var(--basic-size-line-height)]">
                  Access and Permissions
                </div>
              </div>
            </div>

            {/* Access Options */}
            {accessOptions.map((option) => (
              <div
                key={option.id}
                className={`flex flex-col h-[84px] gap-3 p-2.5 ${option.active ? "bg-[#e6e9fa]" : "bg-white"} rounded-lg border border-solid border-[#e4e3e3] w-full`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="h-16 gap-4 flex items-center flex-1">
                    <div className="flex items-center gap-2 flex-1">
                      <div className="flex flex-col h-[62px] items-start justify-center gap-1 flex-1">
                        <div className="w-[198px] h-[22px] font-['Poppins',Helvetica] font-medium text-[#333333] text-lg tracking-[-0.18px] leading-[normal]">
                          {option.title}
                        </div>
                        <div className="w-full h-[22px] font-['Poppins',Helvetica] font-normal text-[#333333] text-sm tracking-[-0.14px] leading-[normal]">
                          {option.description}
                        </div>
                      </div>
                    </div>
                  </div>
                  <ChevronRightIcon className="w-5 h-5" />
                </div>
              </div>
            ))}
          </div>

          {/* Skip Link */}
          <div className="flex items-center justify-end w-full mt-4">
            <div className="font-['Poppins',Helvetica] font-medium text-[#2a9d8f] text-lg text-right tracking-0 leading-[21.6px] underline whitespace-nowrap">
              Skip
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Continue Button */}
      <Button className="w-[371px] h-[50px] px-4 py-2 bg-[#2a9d8f] rounded-[28px] text-fontprimary-white">
        <div className="flex items-center gap-1">
          <span className="font-['Poppins',Helvetica] font-medium text-base leading-[22.4px] whitespace-nowrap">
            Continue
          </span>
        </div>
      </Button>

      {/* Footer */}
      <footer className="flex flex-col w-full max-w-[1218px] items-center p-5 bg-transparent">
        <div className="flex items-center gap-2.5 w-full">
          <div className="flex w-full items-center gap-2">
            <img className="w-4 h-4" alt="Copyright" src="/copyright.svg" />
            <div className="font-['Poppins',Helvetica] font-normal text-[#7c8ba0] text-xs leading-[14.4px] whitespace-nowrap">
              2024 Revutopia. All Rights Reserved.
            </div>
          </div>
          <div className="font-['Poppins',Helvetica] font-normal text-[#2a9d8f] text-xs text-right leading-[14.4px] underline whitespace-nowrap">
            Become a partner
          </div>
        </div>
      </footer>
    </div>
  );
};
