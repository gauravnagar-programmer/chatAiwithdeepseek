import { assets } from "@/assets/assets"
import { useState } from "react"
import Image from "next/image"


const PromptBox = () => {

  const [prompt,setPrompt] = useState('')

  return (
    <form className={`w-full ${false ? "max-w-3xl" : "max-w-2xl"} rounded-3xl bg-[#404045] mt-4 transition-all p-4 `}>
      <textarea  
      className="w-full outline-none resize-none overflow-hidden wrap-break-word bg-transparent"
      name=""
      placeholder="Ask AnyThing?" 
      value={prompt}
      onChange={(e) => setPrompt(e.target.value)}
      />
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <p className="flex items-center gap-2 text-sm  border border-gray-300/40 px-2 py-1 rounded-full cursor-pointer hover:bg-gray-500/20 transition">
            <Image className="h-5" src={assets.deepthink_icon} alt=""/>
            ChatGo S1
          </p>
          <p className="flex items-center gap-2 text-sm  border border-gray-300/40 px-2 py-1 rounded-full cursor-pointer hover:bg-gray-500/20 transition">
            <Image className="h-5" src={assets.search_icon} alt="" />
            Search
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Image src={assets.pin_icon} alt="" />
          <button  className={`${prompt ? "bg-blue-500" : "bg-[#71717a]"} rounded-full p-2 cursor-pointer`}>
          <Image className="w-4 aspect-square" src={prompt ? assets.arrow_icon : assets.arrow_icon_dull} alt="" />

          </button>
        </div>
      </div>
    </form>
  )
}

export default PromptBox