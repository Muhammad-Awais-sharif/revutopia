import { Upload, X } from 'lucide-react';
import { UploadLogoProps } from './upload-logo.types';

export function UploadLogo({ preview, onUpload, onRemove }: UploadLogoProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onUpload(file);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Upload your Logo
      </label>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="logo-upload"
        onChange={handleFileChange}
      />
      {preview ? (
        <div className="relative w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg">
          <img
            src={preview}
            alt="Logo preview"
            className="w-full h-full object-contain"
          />
          <button
            type="button"
            onClick={onRemove}
            className="absolute -top-2 -right-2 p-1 bg-white rounded-full shadow-lg"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      ) : (
        <label
          htmlFor="logo-upload"
          className="flex items-center justify-center w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#2A9D8F]"
        >
          <Upload className="h-8 w-8 text-gray-400" />
        </label>
      )}
    </div>
  );
}
