import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Connection from "@/lib/db";
import userModel from "@/models/user";

export async function POST(req) {
  await Connection();

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const headerPayload = headers();

  const svixHeaders = {
    "svix-id": headerPayload.get("svix-id"),
    "svix-signature": headerPayload.get("svix-signature"),
    "svix-timestamp": headerPayload.get("svix-timestamp"),
  };

  const wh = new Webhook(process.env.SIGNIN_SECRET);

  let evt;
  try {
    evt = wh.verify(body, svixHeaders);
  } catch (err) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const { data, type } = evt;

  const userData = {
    _id: data.id,
    email: data.email_addresses?.[0]?.email_address,
    name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
    image: data.image_url,
  };

  if (type === "user.created") {
    await userModel.create(userData);
  }

  if (type === "user.updated") {
    await userModel.findByIdAndUpdate(data.id, userData, { new: true });
  }

  if (type === "user.deleted") {
    await userModel.findByIdAndDelete(data.id);
  }

  return NextResponse.json({ message: "Event Successful" });
}
