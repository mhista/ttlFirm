import { EmailClient, KnownEmailSendStatus } from "@azure/communication-email";

// pages/api/send-email.js

const connectionString = process.env.ACS_CONNECTION_STRING;
const senderAddress = process.env.SENDER_EMAIL_ADDRESS;

export const POST = async (req) => {
  const { name, email, message, phone } = await req.json();
  console.log("🔍 Connection String:", connectionString ? "Exists" : "Missing");
console.log("🔍 Sender Email Address:", senderAddress ? senderAddress : "Missing");
  

  if (!name || !email || !message || !phone) {
    return new Response("Missing required fields", { status: 400 });
  }

  try {
    const client = new EmailClient(connectionString);
    const email_message = {
      senderAddress,
      recipients: { to: [{ address: "info@turuchilawfirm.com" }] },
      content: {
        subject: "Test email from JS Sample",
        plainText: "This is plaintext body of test email.",
        html: `<div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); border: 1px solid #ddd;">
    
    <h2 style="background: #0073e6; color: #ffffff; text-align: center; padding: 15px; margin: -20px -20px 20px -20px; border-top-left-radius: 8px; border-top-right-radius: 8px;">
        📩 New Client Message
    </h2>
    
    <p style="font-size: 16px; color: #333;"><strong>Name:</strong> ${name}</p>
    <p style="font-size: 16px; color: #333;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #0073e6;">${email}</a></p>
    <p style="font-size: 16px; color: #333;"><strong>Phone:</strong> ${phone}</p>

    <div style="background: #f4f4f4; padding: 15px; border-radius: 5px; margin-top: 15px;">
        <p style="font-size: 16px; font-style: italic; color: #555; margin: 0;">
            ${message}
        </p>
    </div>

    <div style="text-align: center; margin-top: 20px;">
        <a href="mailto:${email}" style="display: inline-block; background: #0073e6; color: #ffffff; text-decoration: none; font-weight: bold; padding: 10px 20px; border-radius: 5px;">
            Reply Now
        </a>
    </div>

    
</div>
`,
      },
    };

    const poller = await client.beginSend(email_message);
    if (!poller.getOperationState().isStarted) {
      return new Response("Failed to send email", { status: 500 });
    }

    // const POLLER_WAIT_TIME = 10;
    // let timeElapsed = 0;

    // while (!poller.isDone()) {
    //   await poller.poll();
    //   console.debug("Email send polling in progress");
    //   await new Promise((resolve) =>
    //     setTimeout(resolve, POLLER_WAIT_TIME * 1000)
    //   );
    //   timeElapsed += POLLER_WAIT_TIME;
    //   if (timeElapsed > 180) {
    //     return new Response("Failed to send email", { status: 500 });
    //   }
    // }

    const result =  poller.getResult();
    if (result.status === KnownEmailSendStatus.Succeeded) {
      return new Response("Email sent successfully", { status: 200 });
    } else {
      return new Response("Failed to send email", { status: 500 });
    }
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response("Failed to send email", { status: 500 });
  }
};
