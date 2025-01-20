import nodemailer from "nodemailer";

export const POST= async(req, res)=> {
        const { name, email, message, phone } = req.body;

        if (!name || !email || !message || !phone) {
            return new Response('Missing required fields', {status:400});
        }

        try {
            // Configure the transporter
            const transporter = nodemailer.createTransport({
                service: "gmail", // Or your email service provider
                auth: {
                    user: 'diweesomchi@gmail.com', // Your email address
                    pass: '@Diwe07068884102', // Your email password or app-specific password
                },
            });
                console.log("sending")
            // Email options
            const mailOptions = {
                from: "name", // Sender email address
                to:"diweesomchi@gmail.com", // Recipient email address
                subject:"phone", // Email subject
                text: message, // Email content in plain text
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
