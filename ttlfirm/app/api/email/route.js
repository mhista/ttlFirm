import nodemailer from "nodemailer";
import { ConfidentialClientApplication } from '@azure/msal-node';
export const POST= async(req, res)=> {
        const { name, email, message, phone } = req.body;
        console.log(req.body)
        // if (!name || !email || !message || !phone) {
        //     return new Response('Missing required fields', {status:400});
        // }
        const msalconfig = {
            service: "gmail", // Or your email service provider
            auth: {
                clientId: "cb2244a4-0ffd-449f-8394-de9eb317808b", // Your email address        authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,

authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
                clientSecret:"9236d2b0-3194-4dca-a947-299823dc150b" // Your email password or app-specific password
            },
        };
        const tokenRequest = {
            scopes: ['https://graph.microsoft.com/.default'], // Microsoft Graph scope
          }; const cca = new ConfidentialClientApplication(msalConfig);

        try {
            // Configure the transporter// Configure Nodemailer
      const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false, // Use TLS
        auth: {
          type: 'OAuth2',
          user: 'info@turuchilawfirm.com', // Your email
          accessToken,
        },
      });

           
                console.log("sending")
            // Email options
            const mailOptions = {
                from: "info@turuchilawfirm.com", // Sender email address
                to:"diweesomchi@gmail.com", // Recipient email address
                subject:"hello", // Email subject
                text: "hiuchiurhfiurhiuf", // Email content in plain text
            };
            // process.env.EMAIL_USER
            // Send the email
            await transporter.sendMail(mailOptions);

            const response =  new Response('Email sent successfully' , {status:200})
            console.log(response);
            return response;
        } catch (error) {
            console.error("Error sending email:", error);
            console.log(error);

            return new Response('Failed to send email', {status:500})
        }
 
}
