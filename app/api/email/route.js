import { EmailClient, KnownEmailSendStatus } from "@azure/communication-email";

const connectionString = process.env.ACS_CONNECTION_STRING;
const senderAddress = process.env.SENDER_EMAIL_ADDRESS;

export const POST = async (req) => {
  const { name, email, message, phone } = await req.json();

  if (!name || !email || !message || !phone) {
    return new Response(JSON.stringify({ success: false, message: "Missing required fields" }), { status: 400 });
  }

  // Check if request has a valid IP (network check)
  const userIP = req.headers.get("x-forwarded-for") || req.headers.get("remote-addr");
  if (!userIP) {
    return new Response(JSON.stringify({ success: false, message: "Network error detected. Please check your internet." }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const client = new EmailClient(connectionString);
    const email_message = {
      senderAddress,
      recipients: { to: [{ address: "info@turuchilawfirm.com" }] },
      content: {
        subject: "New Client Message",
        plainText: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
        html:`<div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); border: 1px solid #ddd;">
    
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
    
        
    </div>`,
      },
    };

    const poller = await client.beginSend(email_message);

    if (!poller.getOperationState().isStarted) {
      throw new Error("Email send operation failed to start.");
      
        }

    const result = await poller.pollUntilDone();

    if (result.status === KnownEmailSendStatus.Succeeded) {
      return new Response(JSON.stringify({ success: true, message: "Email sent successfully!" }), { status: 200 });
    } else {
      throw new Error("Email send failed.");
    }
  } catch (error) {
    console.error("Error sending email:", error);

    // Retry sending in background (silent retry)
    setTimeout(async () => {
      try {
        console.log("Retrying email send...");
        const client = new EmailClient(connectionString);
        const retryPoller = await client.beginSend(email_message);
        await retryPoller.pollUntilDone();
        console.log("Retry email sent successfully.");
      } catch (retryError) {
        console.error("Retry failed:", retryError);
      }
    }, 10000); // Retry after 10 seconds

    return new Response(JSON.stringify({ success: false, message: "Failed to send email" }), { status: 500 });
  }
};





