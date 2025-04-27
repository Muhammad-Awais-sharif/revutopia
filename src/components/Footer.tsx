import { Copyright } from "lucide-react";

export function Footer() {
  return (
    <footer className="flex flex-col w-full max-w-[1218px] items-center p-5 bg-transparent">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <Copyright className="w-4 h-4 text-[#7C8BA0]" />
          <div className="font-['Poppins'] font-normal text-[#7C8BA0] text-xs leading-[14.4px]">
            2024 Revutopia. All Rights Reserved.
          </div>
        </div>
        <div className="font-['Poppins'] font-normal text-[#2A9D8F] text-xs leading-[14.4px] underline cursor-pointer">
          Become a partner
        </div>
      </div>
    </footer>
  );
}