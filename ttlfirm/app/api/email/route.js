import nodemailer from "nodemailer";

export const POST= async(req, res)=> {
        const { name, email, message, phone } = req.body;
        console.log(req.body)
        // if (!name || !email || !message || !phone) {
        //     return new Response('Missing required fields', {status:400});
        // }

        try {
            // Configure the transporter
            const transporter = nodemailer.createTransport({
                service: "gmail", // Or your email service provider
                auth: {
                    user: 'diweesomchi@gmail.com', // Your email address
                    pass: 'qxkx zcyn cvbd nizp', // Your email password or app-specific password
                },
            });
                console.log("sending")
            // Email options
            const mailOptions = {
                from: "diwescollection@gmail.com", // Sender email address
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
