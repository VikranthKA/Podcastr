import type { WebhookEvent } from "@clerk/nextjs/server";
import { httpRouter } from "convex/server";
import { Webhook } from "svix";

process.env
import { internal } from "./_generated/api";
import { httpAction } from "./_generated/server";

// Webhook handler
const handleClerkWebhook = httpAction(async (ctx, request) => {
  const event = await validateRequest(request);
  if (!event) {
    console.error("Invalid Webhook Event");
    return new Response("Invalid request", { status: 400 });
  }

  // Handle the event type based on the event received
  switch (event.type) {
    case "user.created":
      console.log("User Created Event Triggered");
      await ctx.runMutation(internal.user.createUser, {
        clerkId: event.data.id,
        email: event.data.email_addresses[0].email_address,
        imageUrl: event.data.image_url,
        name: event.data.first_name!,
      });
      break;
    case "user.updated":
      console.log("User Updated Event Triggered");
      await ctx.runMutation(internal.user.updateUser, {
        clerkId: event.data.id,
        imageUrl: event.data.image_url,
        email: event.data.email_addresses[0].email_address,
      });
      break;
    case "user.deleted":
      console.log("User Deleted Event Triggered");
      await ctx.runMutation(internal.user.deleteUser, {
        clerkId: event.data.id as string,
      });
      break;
    default:
      console.log("Unhandled Event Type:", event.type);
  }

  return new Response(null, { status: 200 });
});

// HTTP router setup
const http = httpRouter();

// Route for Clerk Webhook
http.route({
  path: "/clerk",
  method: "POST",
  handler: handleClerkWebhook,
});


// Helper function to validate the request and verify signature
const validateRequest = async (req: Request): Promise<WebhookEvent | undefined> => {
    

  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  console.log("Webhook Secret:", webhookSecret);
  
  if (!webhookSecret) {
    throw new Error("CLERK_WEBHOOK_SECRET is not defined");
  }

  // Get the raw payload from the request
  const payloadString = await req.text();
  console.log("Request Payload:", payloadString);

  // Get the headers from the request
  const headerPayload = req.headers;
  console.log("Request Headers:", headerPayload);

  // Extract the necessary headers for signature verification
  const svixHeaders = {
    "svix-id": headerPayload.get("svix-id")!,
    "svix-timestamp": headerPayload.get("svix-timestamp")!,
    "svix-signature": headerPayload.get("svix-signature")!,
  };
  console.log("Svix Headers:", svixHeaders);

  try {
    // Create a Webhook instance with the webhook secret
    const wh = new Webhook(webhookSecret);

    // Verify the webhook payload
    const event = wh.verify(payloadString, svixHeaders);
    console.log("Verified Event:", event);
    return event as WebhookEvent;
  } catch (error) {
    console.error("Webhook verification failed:", error);
    return undefined;
  }
};

export default http;
