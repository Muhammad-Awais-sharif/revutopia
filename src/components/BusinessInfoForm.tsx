import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BusinessInfoInputs, businessInfoSchema } from "../lib/schema";
import { Button } from "./ui/button";
import { StyledInput } from "./ui/styled-input";
import { ChevronDown, MapPin, Upload, X } from "lucide-react";
import { useState } from "react";
import Flag from "react-world-flags";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

interface BusinessInfoFormProps {
  onSubmit: (data: BusinessInfoInputs) => void;
  defaultValues?: Partial<BusinessInfoInputs>;
}

const countries = [
  { id: "us", name: "United Kingdom" },
  { id: "ga", name: "Gabon" },
  { id: "gd", name: "Grenada" },
  { id: "kr", name: "Korea" },
  { id: "hk", name: "Hong Kong" },
];

export function BusinessInfoForm({
  onSubmit,
  defaultValues,
}: BusinessInfoFormProps) {
  const [showCountries, setShowCountries] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue: setPlacesValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: selectedCountry.id },
    },
    debounce: 300,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<BusinessInfoInputs>({
    resolver: zodResolver(businessInfoSchema),
    defaultValues,
  });

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
        setValue("logo", file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setLogoPreview(null);
    setValue("logo", null);
    const logoInput = document.getElementById(
      "logo-upload"
    ) as HTMLInputElement;
    if (logoInput) {
      logoInput.value = ""; // This will clear the file input
    }
  };

  const handleAddressSelect = async (address: string) => {
    setValue("address", address);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      //const { lat, lng } = await getLatLng(results[0]);
      // Handle map update here
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-[#333]">General details</h2>

        <div className="space-y-4">
          <StyledInput
            {...register("businessName")}
            label="Business name"
            required
            error={errors.businessName?.message}
          />

          <div className="flex gap-4">
            <StyledInput
              {...register("companyNumber")}
              label="Company Number"
              required
              error={errors.companyNumber?.message}
            />

            <div className="relative flex-1">
              <div
                className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer"
                onClick={() => setShowCountries(!showCountries)}
              >
                <Flag
                  code={selectedCountry.id}
                  style={{ width: 24, height: 24 }}
                />
                <span>{selectedCountry.name}</span>
                <ChevronDown className="h-5 w-5 text-[#7C8BA0] ml-auto" />
              </div>

              {showCountries && (
                <div className="absolute top-full left-0 w-full mt-1 bg-white border rounded-lg shadow-lg z-10">
                  <div className="p-2">
                    <input
                      type="text"
                      placeholder="Search Country name"
                      className="w-full p-2 border rounded"
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  {countries
                    .filter((country) =>
                      country.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    )
                    .map((country) => (
                      <div
                        key={country.id}
                        className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer"
                        onClick={() => {
                          setSelectedCountry(country);
                          setShowCountries(false);
                          setValue("country", country.name);
                        }}
                      >
                        <Flag
                          code={country.id}
                          style={{ width: 24, height: 24 }}
                        />
                        <span>{country.name}</span>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>

          <StyledInput
            {...register("vatNumber")}
            label="VAT Number"
            error={errors.vatNumber?.message}
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Upload your Logo
            </label>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="logo-upload"
              onChange={handleLogoUpload}
            />

            {logoPreview ? (
              <div className="relative flex items-center justify-center w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg">
                <img
                  src={logoPreview}
                  alt="Logo preview"
                  className="w-full h-full object-contain"
                />
                <button
                  type="button"
                  onClick={handleRemoveLogo}
                  className="absolute -top-2 -right-2 p-1 bg-white rounded-full shadow-lg"
                >
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            ) : (
              /* EMPTY MODE: CLICKABLE LABEL OPENS PICKER */
              <label
                htmlFor="logo-upload"
                className="flex items-center justify-center w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#2A9D8F]"
              >
                <Upload className="h-8 w-8 text-gray-400" />
              </label>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Address</h3>
            <div className="space-y-4">
              <div className="relative">
                <StyledInput
                  value={value}
                  onChange={(e) => {
                    setPlacesValue(e.target.value);
                  }}
                  label="Address"
                  icon={<MapPin className="h-5 w-5 text-[#7C8BA0]" />}
                  error={errors.address?.message}
                />
                {status === "OK" && (
                  <ul className="absolute z-10 w-full bg-white border rounded-lg shadow-lg mt-1">
                    {data.map((suggestion) => (
                      <li
                        key={suggestion.place_id}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() =>
                          handleAddressSelect(suggestion.description)
                        }
                      >
                        {suggestion.description}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <StyledInput
                  {...register("apartment")}
                  label="Apt. / Unit no."
                  error={errors.apartment?.message}
                />
                <StyledInput
                  {...register("state")}
                  label="State"
                  required
                  error={errors.state?.message}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <StyledInput
                  {...register("city")}
                  label="City"
                  required
                  error={errors.city?.message}
                />
                <StyledInput
                  {...register("postCode")}
                  label="Post code"
                  required
                  error={errors.postCode?.message}
                />
              </div>
            </div>
          </div>
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
