import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinkAccountInputs, linkAccountSchema } from "../lib/schema";
import { Button } from "./ui/button";
import { StyledInput } from "./ui/styled-input";
import { ArrowLeft, Facebook, Globe, Search, Trash2 } from "lucide-react";

interface LinkAccountFormProps {
  onSubmit: (data: LinkAccountInputs[]) => void;
  onBack: () => void;
  defaultValues?: LinkAccountInputs[];
}

const socialPlatforms = [
  { id: "facebook", name: "Facebook", icon: Facebook },
  { id: "google", name: "Google", icon: Globe },
  { id: "tripadvisor", name: "TripAdvisor", icon: Globe },
  { id: "yelp", name: "Yelp", icon: Globe },
];

export function LinkAccountForm({
  onSubmit,
  onBack,
  defaultValues = [],
}: LinkAccountFormProps) {
  const [connectedAccounts, setConnectedAccounts] = useState<
    Array<{ platform: string; url: string }>
  >(defaultValues);
  const [showPlatformList, setShowPlatformList] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<{ url: string }>({
    resolver: zodResolver(linkAccountSchema.pick({ url: true })),
  });

  const url = watch("url");

  const handleConnect = () => {
    if (selectedPlatform && url) {
      setConnectedAccounts([...connectedAccounts, { platform: selectedPlatform, url }]);
      reset();
      setSelectedPlatform(null);
    }
  };

  const handleDisconnect = (index: number) => {
    setConnectedAccounts(connectedAccounts.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-[#2A9D8F]" />
          </button>
          <h2 className="text-2xl font-semibold text-[#333]">Social Profile</h2>
        </div>

        <p className="text-[#7C8BA0]">
          Build customer trust by sharing your social profiles.
        </p>

        <div className="space-y-4">
          {connectedAccounts.map((account, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-[#F7F5FA] rounded-lg"
            >
              <div className="flex items-center gap-3">
                {socialPlatforms.find(p => p.id === account.platform)?.icon && (
                  socialPlatforms.find(p => p.id === account.platform)!.icon({ className: "h-5 w-5 text-[#2A9D8F]" })
                )}
                <span className="text-[#333]">{account.url}</span>
              </div>
              <button
                type="button"
                onClick={() => handleDisconnect(index)}
                className="px-4 py-2 bg-[#2A9D8F] text-white rounded-md"
              >
                Disconnect
              </button>
            </div>
          ))}

          <div className="relative">
            <div
              className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer"
              onClick={() => setShowPlatformList(!showPlatformList)}
            >
              <Search className="h-5 w-5 text-[#7C8BA0]" />
              <span className="text-[#7C8BA0]">
                {selectedPlatform || "Search profile"}
              </span>
            </div>

            {showPlatformList && (
              <div className="absolute top-full left-0 w-full mt-1 bg-white border rounded-lg shadow-lg z-10">
                {socialPlatforms.map((platform) => (
                  <div
                    key={platform.id}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      setSelectedPlatform(platform.name);
                      setShowPlatformList(false);
                    }}
                  >
                    <platform.icon className="h-5 w-5 text-[#2A9D8F]" />
                    <span>{platform.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {selectedPlatform && (
            <div className="flex gap-4">
              <StyledInput
                {...register("url")}
                label="Add web address"
                error={errors.url?.message}
                className="flex-1"
              />
              <Button
                type="button"
                onClick={handleConnect}
                className="px-4 bg-[#2A9D8F] text-white self-end"
              >
                Connect
              </Button>
            </div>
          )}
        </div>
      </div>

      <Button
        onClick={() => onSubmit(connectedAccounts)}
        className="w-full bg-[#2A9D8F] text-white hover:bg-[#238276]"
      >
        Continue
      </Button>
    </div>
  );
}