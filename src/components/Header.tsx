import { ChevronDown, HelpCircle, Sun } from "lucide-react";
import logo from "@/assets/images/revutopia-logo.png";

export function Header() {
  return (
    <header className="flex h-20 items-center justify-between px-[60px] py-5 w-full bg-white border-b border-[#e6e9fa]">
      <div className="flex items-center gap-3">
        <img
          src={logo}
          alt="Revutopia"
          className="h-12"
        />
      </div>

      <div className="flex items-center justify-end gap-10">
        <div className="flex w-14 items-center gap-2.5 p-[3px] bg-[#f7f5fa] rounded-[32px] overflow-hidden">
          <div className="w-6 h-6 bg-white rounded-3xl overflow-hidden shadow-[0px_2px_4px_#00000033,inset_0px_-1px_1px_#0000001a,inset_0px_2px_2px_#ffffff] flex items-center justify-center">
            <Sun className="w-4 h-4 text-[#2A9D8F]" />
          </div>
        </div>

        <div className="flex w-[145px] items-center gap-[30px]">
          <div className="flex w-[91px] items-center gap-2.5">
            <div className="w-[57px] font-['Poppins'] font-normal text-black text-sm leading-[22px]">
              English
            </div>
            <ChevronDown className="w-5 h-5 text-[#7C8BA0]" />
          </div>

          <HelpCircle className="w-6 h-6 text-[#7C8BA0]" />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-[#3A4053] text-sm">Thomas Anree</span>
            <span className="text-[#7C8BA0] text-xs">Admin</span>
          </div>
          <div className="w-[45px] h-[45px] rounded-full bg-[#2A9D8F] flex items-center justify-center overflow-hidden">
            <img
              src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
              alt="Thomas Anree"
              className="w-full h-full object-cover"
            />
          </div>
          <ChevronDown className="w-5 h-5 text-[#7C8BA0]" />
        </div>
      </div>
    </header>
  );
}
