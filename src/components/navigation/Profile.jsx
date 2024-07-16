import { TbLogout } from "react-icons/tb";

import Button from "../ui/Button";
import Avatar from "./Avatar";

export default function Profile() {
  return (
    <div
      role="tooltip"
      className="absolute z-10 inline-block w-64 text-sm transition-opacity duration-300 bg-white border rounded-lg shadow-md border-stroke -bottom-5 left-20"
    >
      <div className="p-3">
        <div className="flex mb-4">
          <div className="flex items-center">
            <Avatar initial="J" />
          </div>
          <div className="ml-2">
            <p className="text-base font-semibold">Jieun Oh</p>
            <p className="text-sm font-light">jieunoh@gmail.com</p>
          </div>
        </div>
        <div className="float-right">
          <Button
            text="Log out"
            textColor="text-black"
            borderColor="border-stroke"
            backgroundColor="bg-white"
            hoverBackgroundColor="hover:bg-gray-50"
          >
            <TbLogout />
          </Button>
        </div>
      </div>
      <div className="w-0 h-0 border-t-10 border-t-transparent border-b-10 border-b-transparent border-r-10 border-r-white absolute bottom-8 -left-2.5"></div>
    </div>
  );
}
