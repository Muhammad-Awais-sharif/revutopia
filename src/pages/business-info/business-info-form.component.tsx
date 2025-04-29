import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MapPin } from 'lucide-react';
import { useState } from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import GoogleMapReact from 'google-map-react';
import { BusinessInfoFormProps } from './business-info-form.types';
import {
  BusinessInfoInputs,
  businessInfoSchema,
} from './business-info-form.schema';
import { UploadLogo } from './components/upload-logo/upload-logo.component';
import { CountryDropdown } from './components/country-dropdown/country-dropdown.component';
import { countries } from './components/country-dropdown/countries.data';
import { StyledInput } from '../../components/ui/styled-input/styled-input.component';
import { Button } from '../../components/ui/button/button.component';

export function BusinessInfoForm({
  onSubmit,
  defaultValues,
}: BusinessInfoFormProps) {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [mapCoords, setMapCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const {
    value: placesValue,
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

  const handleRemoveLogo = () => {
    setLogoPreview(null);
    setValue('logo', null);
    const logoInput = document.getElementById(
      'logo-upload'
    ) as HTMLInputElement;
    if (logoInput) {
      logoInput.value = '';
    }
  };

  const handleAddressSelect = async (address: string) => {
    setPlacesValue(address, false);
    setValue('address', address);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      setMapCoords({ lat, lng });

      const addressComponents = results[0].address_components;

      const city = addressComponents.find((comp) =>
        comp.types.includes('locality')
      )?.long_name;

      const state = addressComponents.find((comp) =>
        comp.types.includes('administrative_area_level_1')
      )?.long_name;

      const postCode = addressComponents.find((comp) =>
        comp.types.includes('postal_code')
      )?.long_name;

      if (city) setValue('city', city);
      if (state) setValue('state', state);
      if (postCode) setValue('postCode', postCode);
    } catch (error) {
      console.error('Error fetching address details: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-[#333]">General details</h2>

        <div className="space-y-4">
          <StyledInput
            {...register('businessName')}
            label="Business name"
            required
            error={errors.businessName?.message}
          />

          <div className="flex gap-4">
            <StyledInput
              {...register('companyNumber')}
              label="Company Number"
              required
              error={errors.companyNumber?.message}
            />

            <CountryDropdown
              selected={selectedCountry}
              onSelect={(country) => {
                setSelectedCountry(country);
                setValue('country', country.name);
              }}
            />
          </div>

          <StyledInput
            {...register('vatNumber')}
            label="VAT Number"
            error={errors.vatNumber?.message}
          />

          <UploadLogo
            preview={logoPreview}
            onUpload={(file) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                setLogoPreview(reader.result as string);
                setValue('logo', file);
              };
              reader.readAsDataURL(file);
            }}
            onRemove={handleRemoveLogo}
          />

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Address</h3>
            <div className="space-y-4">
              <div className="relative">
                <StyledInput
                  value={placesValue}
                  onChange={(e) => setPlacesValue(e.target.value)}
                  label="Address"
                  icon={<MapPin className="h-5 w-5 text-[#7C8BA0]" />}
                  error={errors.address?.message}
                />
                {status === 'OK' && (
                  <ul className="absolute z-10 w-full bg-white border rounded-lg shadow-lg mt-1 max-h-60 overflow-auto">
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
                  {...register('apartment')}
                  label="Apt. / Unit no."
                  error={errors.apartment?.message}
                />
                <StyledInput
                  {...register('state')}
                  label="State"
                  required
                  error={errors.state?.message}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <StyledInput
                  {...register('city')}
                  label="City"
                  required
                  error={errors.city?.message}
                />
                <StyledInput
                  {...register('postCode')}
                  label="Post code"
                  required
                  error={errors.postCode?.message}
                />
              </div>
            </div>

            {mapCoords && (
              <div className="mt-4 h-64 w-full rounded-lg overflow-hidden">
                <GoogleMapReact
                  bootstrapURLKeys={{ key: 'YOUR_GOOGLE_MAPS_API_KEY' }}
                  center={mapCoords}
                  zoom={15}
                >
                  {/* <Marker
                    lat={mapCoords.lat}
                    lng={mapCoords.lng}
                    text="Selected Address"
                  /> */}
                </GoogleMapReact>
              </div>
            )}
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
