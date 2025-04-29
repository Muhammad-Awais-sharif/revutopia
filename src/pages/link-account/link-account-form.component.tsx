import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { StyledInput } from '../../components/ui/styled-input/styled-input.component';
import { ArrowLeft, ChevronDown, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/button/button.component';
import { LinkAccountFormProps } from './link-account-form.types';
import { linkAccountSchema } from './link-account-form.schema';
import { allPlatforms } from './link-account-form.data';

export function LinkAccountForm({ onSubmit, onBack }: LinkAccountFormProps) {
  const [connectedAccounts, setConnectedAccounts] = useState<
    Array<{ platform: string; url?: string; email?: string }>
  >([]);

  const [showPlatformDropdown, setShowPlatformDropdown] = useState(false);
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

  const url = watch('url');

  const availablePlatforms = allPlatforms.filter(
    (platform) =>
      !connectedAccounts.some((account) => account.platform === platform.id)
  );

  const handleAddAccount = () => {
    if (selectedPlatform && url) {
      const newAccount = {
        platform: selectedPlatform,
        ...(selectedPlatform === 'google' ? { email: url } : { url }),
      };
      setConnectedAccounts([...connectedAccounts, newAccount]);
      reset();
      setSelectedPlatform(null);
    }
  };

  const handleRemoveAccount = (platformId: string) => {
    setConnectedAccounts(
      connectedAccounts.filter((account) => account.platform !== platformId)
    );
  };

  // Helper function to safely render platform icons
  const renderPlatformIcon = (platformId: string) => {
    const platform = allPlatforms.find((p) => p.id === platformId);
    if (!platform) return null;

    const Icon = platform.icon;
    return <Icon className="h-5 w-5" style={{ color: platform.color }} />;
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
          <h1 className="text-2xl font-semibold text-[#333]">Social Profile</h1>
        </div>

        <p className="text-[#7C8BA0]">
          Build customer trust by sharing your social profiles.
        </p>

        <div className="space-y-4">
          {connectedAccounts.map((account) => (
            <div
              key={account.platform}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                {renderPlatformIcon(account.platform)}
                <div>
                  {account.email ? (
                    <p className="text-[#7C8BA0]">
                      Connected as {account.email}
                    </p>
                  ) : (
                    <p className="text-[#7C8BA0]">{account.url}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  onClick={() => handleRemoveAccount(account.platform)}
                  className="px-3 py-1 rounded-md bg-[#2A9D8F] text-white hover:bg-[#238276]"
                >
                  Disconnect
                </Button>
                <button
                  type="button"
                  onClick={() => handleRemoveAccount(account.platform)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}

          {/* Add New Account Section */}
          {availablePlatforms.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-lg font-medium text-[#333]">
                Add web address
              </h2>
              <div className="flex gap-4 items-end">
                <div className="flex-1 relative">
                  <button
                    type="button"
                    className="flex items-center justify-between w-full p-2 border rounded-lg"
                    onClick={() =>
                      setShowPlatformDropdown(!showPlatformDropdown)
                    }
                  >
                    <div className="flex items-center gap-2">
                      {selectedPlatform ? (
                        <>
                          {renderPlatformIcon(selectedPlatform)}
                          <span>
                            {
                              allPlatforms.find(
                                (p) => p.id === selectedPlatform
                              )?.name
                            }
                          </span>
                        </>
                      ) : (
                        <span className="text-[#7C8BA0]">Select platform</span>
                      )}
                    </div>
                    <ChevronDown className="h-5 w-5 text-[#7C8BA0]" />
                  </button>

                  {showPlatformDropdown && (
                    <div className="absolute top-full left-0 w-full mt-1 bg-white border rounded-lg shadow-lg z-10">
                      {availablePlatforms.map((platform) => {
                        const Icon = platform.icon;
                        return (
                          <button
                            key={platform.id}
                            type="button"
                            className="flex items-center gap-3 w-full p-3 hover:bg-gray-50"
                            onClick={() => {
                              setSelectedPlatform(platform.id);
                              setShowPlatformDropdown(false);
                            }}
                          >
                            <Icon
                              className="h-5 w-5"
                              style={{ color: platform.color }}
                            />
                            <span>{platform.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                <StyledInput
                  {...register('url')}
                  placeholder={
                    selectedPlatform === 'facebook'
                      ? 'https://www.facebook.com/yourpage'
                      : selectedPlatform === 'google'
                      ? 'yourname@gmail.com'
                      : 'Enter profile URL'
                  }
                  error={errors.url?.message}
                  className="flex-1"
                />

                <Button
                  type="button"
                  onClick={handleAddAccount}
                  disabled={!selectedPlatform || !url}
                  className="px-4 bg-[#2A9D8F] text-white h-[42px] disabled:opacity-50 hover:bg-[#238276]"
                >
                  Connect
                </Button>
              </div>
              <div className="flex flex-wrap gap-4 mt-2">
                {availablePlatforms.map((platform) => {
                  const Icon = platform.icon;
                  return (
                    <div key={platform.id} className="flex items-center gap-2">
                      <Icon
                        className="h-4 w-4"
                        style={{ color: platform.color }}
                      />
                      <span className="text-sm text-[#7C8BA0]">
                        {platform.name}
                      </span>
                    </div>
                  );
                })}
              </div>
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
