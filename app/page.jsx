"use client";
import { assets } from "@/assets/assets";
import Message from "@/components/Message";
import PromptBox from "@/components/PromptBox";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [expand, setExpand] = useState(false);
  const [message,setMessage] = useState([])
  const [isLoading,setIsLoading] = useState(false)

  return (
    <div>
      <div className="flex h-screen">
        <Sidebar expand={expand} setExpand={setExpand} />

        <div className="flex-1 flex flex-col items-center justify-center px-4 pb-8 text-white relative bg-[#292a2d]">
          <div className="md:hidden absolute px-4 top-6 flex items-center justify-between w-full">
            <Image
              onClick={() => setExpand((prev) => !prev)}
              src={assets.menu_icon}
              className="rotate-180"
              alt=""
            />
            <Image className="opacity-70" src={assets.chat_icon} alt="" />
          </div>

          {/* message nav */}

          {message.length === 0 ?
          (
            <>
              <div className="flex items-center gap-3"> 
                <Image src={assets.logo_icon} alt="" className="h-16 "/>
                <p className="text-2xl font-medium">Hey, I'm ChatGo</p>
              </div>
                <p className="text-sm mt-2">How can I help you today ? </p>
            </>
          ):
          (
            <div>
              <Message role="user" content="What you name? " />
            </div>
          )
        }

        {/* prompt box */}

        <PromptBox isLoading={isLoading} setIsLoading={setIsLoading}/>

        
          <p className="text-xs absolute bottom-1 text-gray-300">ChatGo make mistake , Check content before use!</p>
        
        </div>
      </div>
    </div>
  );
}
