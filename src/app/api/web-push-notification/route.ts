import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  // Parse the request body
  const { endpoint, keys } = await request.json();
  // Validate the request body
  if (!endpoint || !keys) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
  // Check if the endpoint is already in the database
  // If it is, update the existing subscription
  try {
    // Create subscription document
    const subscription = {
      type: "webpush",
      endpoint,
      keys,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Promisify NeDB operation
    const result = await new Promise((resolve, reject) => {
      db.update(
        { endpoint: endpoint },
        subscription,
        { upsert: true },
        (err, numReplaced, upsert) => {
          if (err) reject(err);
          resolve({ numReplaced, upsert });
        }
      );
    });

    return NextResponse.json(
      { message: "Subscription saved successfully", success: true, result },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message, success: false },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
