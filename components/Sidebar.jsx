import { assets } from "@/assets/assets";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs";
import { UseAppContext } from "@/context/AppContext";
import ChatLabel from "./ChatLabel";
import { useState } from "react";

const Sidebar = ({ expand, setExpand }) => {
  const { openSignIn } = useClerk();
  const [openMenu, setOpenMenu] = useState({ id: 0, open: false });
  const { user,isLoaded,isSignedIn } = UseAppContext();

  console.log(user);

  return (
    <div
      className={`flex relative flex-col justify-between pt-7 transition-all bg-[#212327] z-50 max-md:absolute  max-md:h-screen ${expand ? "p-4 w-64" : "md:w-20 w-0 max-md:overflow-hidden"}`}
    >
      <div>
        <div
          className={`  flex ${expand ? " flex-row gap-10" : " flex-col gap-8 items-center"}`}
        >
          <Image
            className={`${expand ? "w-36" : "w-10"}`}
            src={expand ? assets.logo_text : assets.logo_icon}
            alt=""
          />

          <div
            onClick={() => setExpand((prev) => !prev)}
            className="group relative flex items-center justify-center hover:bg-gray-500/20 transition-all duration-300 h-9 w-9 aspect-square rounded-lg cursor-pointer"
          >
            <Image src={assets.menu_icon} alt="" className="md:hidden" />
            <Image
              src={expand ? assets.sidebar_close_icon : assets.sidebar_icon}
              className="hidden md:block"
              alt=""
            />

            <div
              className={`absolute w-max  ${expand ? "left-1/2 -translate-1/2  top-15" : "left-0 top-12"} opacity-0 group-hover:opacity-100 transition bg-black text-sm text-white px-3 py-2 rounded-lg shadow-lg pointer-events-none`}
            >
              {expand ? "close sidebar" : "open sidebar"}
              <div
                className={`w-3 h-3  bg-black absolute rotate-45 -top-1.5 ${expand ? "left-1/2  -translate-x-1/2" : "left-4  "}`}
              ></div>
            </div>
          </div>
        </div>
        <button
          className={`flex  items-center mt-8 justify-center cursor-pointer ${expand ? "hover:opacity-90 bg-blue-500 text-sm rounded-2xl gap-2 p-2.5 w-max" : "group relative w-9 h-9 mx-auto hover:bg-gray-500/30 rounded-lg"}`}
        >
          <Image
            className={expand ? "w-6" : "w-7"}
            src={expand ? assets.chat_icon : assets.chat_icon_dull}
            alt=""
          />
          <div className="absolute max-w -top-12 -right-12 opacity-0 group-hover:opacity-100 transition bg-black rounded-lg text-white px-2 py-2 text-sm shadow-lg pointer-events-none">
            New Chat
            <div className="w-3 h-3 absolute bg-black rotate-45 left-4 -bottom-1.5"></div>
          </div>
          {expand && <p className="font-medium text-white">New Chat</p>}
        </button>

        <div
          className={`mt-8 text-white/50 text-sm ${expand ? "block" : "hidden"}`}
        >
          <p className=" my-1 ">Recents</p>
          <ChatLabel openMenu={openMenu} setOpenMenu={setOpenMenu} />
        </div>

        <div className="">
          <div
            onClick={() => {
              if(user) return
              if (!isSignedIn) openSignIn();
            }}
            className={`  absolute  bottom-1.5 flex items-center  ${expand ? "hover:bg-white/10 rounded-lg" : "justify-center  w-full  gap-5"} gap-5 text-white/60 text-sm mb-2 p-2 cursor-pointer`}
          >
            { isSignedIn ? (
              <UserButton />
            ) : (
              <Image
                src={assets.profile_icon}
                className={`${expand ? "w-5" : "w-6.5"}`}
                alt=""
              />
            )}

            {expand && <span className="text-sm select-none">My Profile</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
