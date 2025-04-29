export interface UploadLogoProps {
  preview: string | null;
  onUpload: (file: File) => void;
  onRemove: () => void;
}
