// /**
//  * Welcome to Cloudflare Workers! This is your first worker.
//  *
//  * - Run `npm run dev` in your terminal to start a development server
//  * - Open a browser tab at http://localhost:8787/ to see your worker in action
//  * - Run `npm run deploy` to publish your worker
//  *
//  * Learn more at https://developers.cloudflare.com/workers/
//  */

require('dotenv').config();
// const nodemailer = require('nodemailer');
import mailChannelsPlugin from "@cloudflare/pages-plugin-mailchannels";

addEventListener("fetch", event => {
  event.passThroughOnException()
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    // You may need to obtain the DKIM_PRIVATE_KEY in a different way,
    // possibly through the Cloudflare environment variables.
    console.log(process.env.DKIM_PRIVATE_KEY)
    const DKIM_PRIVATE_KEY = process.env.DKIM_PRIVATE_KEY;

    // Ensure you have the correct domain, selector, and email details
    const mailChannelsOptions = {
      personalizations: [
        {
          to: [{ name: "Ojas", email: "ojasaparadh185@gmail.com" }],
          dkim_domain: "thinkred.tech",
          dkim_selector: "mailchannels",
          dkim_private_key: DKIM_PRIVATE_KEY,
        },
      ],
      from: {
        name: "Ojas thinkred Support",
        email: "ojas@thinkred.tech",
      },
      subject: "Test Email",
      text: "This is a test email sent using Cloudflare Workers and MailChannels.",
    };

    try {
      const result = await mailChannelsPlugin(mailChannelsOptions);
      
      // Respond with a message based on the result of sending the email
      return new Response("Email sent successfully!", { status: 200 });
    } catch (error) {
      // Handle any errors that occurred during the email sending process
      return new Response("Error sending email: " + error.message, { status: 500 });
    }
}

