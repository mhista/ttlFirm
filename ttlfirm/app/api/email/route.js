import { EmailClient, KnownEmailSendStatus } from "@azure/communication-email";

// pages/api/send-email.js

const connectionString = process.env.ACS_CONNECTION_STRING;
const senderAddress = process.env.SENDER_EMAIL_ADDRESS;

export const POST = async (req) => {
  const { name, email, message, phone } = await req.json();
  console.log(email);
  console.log(name);
  console.log(message);
  console.log(phone);

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
        html: `<div> ${message}</div>
`,
      },
    };

    const poller = await client.beginSend(email_message);
    if (!poller.getOperationState().isStarted) {
      return new Response("Failed to send email", { status: 500 });
    }

    const POLLER_WAIT_TIME = 10;
    let timeElapsed = 0;

    while (!poller.isDone()) {
      await poller.poll();
      console.debug("Email send polling in progress");
      await new Promise((resolve) =>
        setTimeout(resolve, POLLER_WAIT_TIME * 1000)
      );
      timeElapsed += POLLER_WAIT_TIME;
      if (timeElapsed > 180) {
        return new Response("Failed to send email", { status: 500 });
      }
    }

    const result = poller.getResult();
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
