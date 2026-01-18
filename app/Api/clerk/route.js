import {Webhook} from "svix"
import Connection from "@/config/db"
import userModel from "@/models/user"
import { headers } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(req){

  const wh = new Webhook(process.env.SIGNIN_SECRET)
  const headerPayload =  headers()
 const svixHeaders = {
  "svix-id": headerPayload.get("svix-id"),
  "svix-signature": headerPayload.get("svix-signature"),
  "svix-timestamp": headerPayload.get("svix-timestamp"),
}

  const payload = await req.json()
  const body = JSON.stringify(payload)
  const {data,type} = wh.verify(body,svixHeaders)

  const userData = { 
    _id : data.id,
    email : data.email_addresses[0].email_address,
    name : `${data.first_name} ${data.last_name}`,
    image : data.image_url
  }

  await Connection()

  switch (type) {
    case "user.created":
      await userModel.create(userData)
      break;

    case "user.updated":
      await userModel.findByIdAndUpdate(data.id,userData)
      break;

    case "user.deleted":
      await userModel.findByIdAndDelete(data.id)
      break

  }

  return NextResponse.json({message : "Event Successful"}) 

}