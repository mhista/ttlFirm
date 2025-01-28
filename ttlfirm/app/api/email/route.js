import nodemailer from "nodemailer";
import { ConfidentialClientApplication } from '@azure/msal-node';

export const POST = async (req, res) => {
    const { name, email, message, phone } = req.body;
    console.log(req.body);

    if (!name || !email || !message || !phone) {
        return new Response('Missing required fields', { status: 400 });
    }

    const msalConfig = {
        auth: {
            clientId: process.env.MICROSOFT_CLIENT_ID, // Your Azure app client ID
            clientSecret: process.env.MICROSOFT_SECRET_ID, // Your Azure app client secret
            authority: `https://login.microsoftonline.com/${process.env.MICROSOFT_TENANT_ID}`, // Your Azure tenant ID
        },
    };

    const cca = new ConfidentialClientApplication(msalConfig);

    try {
        const tokenResponse = await cca.acquireTokenByClientCredential({
            scopes: ["https://graph.microsoft.com/.default"],
        });

        const accessToken = tokenResponse.accessToken;

        const transporter = nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false,
            auth: {
                type: 'OAuth2',
                user: 'info@turuchilawfirm.com', // Your email
                accessToken,
            },
        });

        const mailOptions = {
            from: "info@turuchilawfirm.com",
            to: "diweesomchi@gmail.com",
            subject: "New Message from Contact Form",
            text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
        };

        await transporter.sendMail(mailOptions);

        return new Response('Email sent successfully', { status: 200 });
    } catch (error) {
        console.error("Error sending email:", error);
        return new Response('Failed to send email', { status: 500 });
    }
};