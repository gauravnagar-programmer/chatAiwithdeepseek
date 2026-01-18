import {Webhook} from "svix"
import Connection from "@/config/db"
import userModel from "@/models/user"
import { headers } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(req){

  const wh = new Webhook(process.env.SIGNIN_SECRET)
  const headerPayload = await headers()
  const svixHeaders = {
    "svix-id" : req.headerPayload.get("svix-id"),
    "svix-timestamp" : req.headerPayload.get("svix-timestamp"),
    "svix-signature" : req.headerPayload.get("svix-signature")
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

    case "user.created":
      await userModel.findByIdAndDelete(data.id)
      break;
  
    default:
      break;
  }

  return NextResponse.json({message : "Event Successful"})

}