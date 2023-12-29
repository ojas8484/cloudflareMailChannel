// /**
//  * Welcome to Cloudflare Workers! This is your first worker.
//  *
//  * - Run `npm run dev` in your terminal to start a development server
//  * - Open a browser tab at http://localhost:8787/ to see your worker in action
//  * - Run `npm run deploy` to publish your worker
//  *
//  * Learn more at https://developers.cloudflare.com/workers/
//  */


// const nodemailer = require('nodemailer');
import mailChannelsPlugin from "@cloudflare/pages-plugin-mailchannels";

addEventListener("fetch", event => {
  event.passThroughOnException()
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    // You may need to obtain the DKIM_PRIVATE_KEY in a different way,
    // possibly through the Cloudflare environment variables.
    const DKIM_PRIVATE_KEY = "MIIEowIBAAKCAQEApq6QX1aXdy8PtFn9bxlobD1l3zQx1+VIw0JSWox19ozzW8lk+WtQeVnURkwahSLU7/Mn8498jtTrIBet0kAVN7rsU4bbb9Tbv7NvOd3VNRJr6B5XpWM5sRulwrx/QDi+R+WiQMPugqXsqR3PSy+F8isjV+Albkb/ay92puO/piZwnjqg8MaRn7MGowwmOVinrzow5lymd45Ga+gH0ZcBhzcf7Fc9O+W/AtMbhu/iisoWaA6Yn6cv3Zc2GTqayqQ2f0eYanZwoZAJoWLe/eovlIjI82SbI4f+T/ucsWD29xuLxIZ7Rx/XSSlXCDh9Ec7c3GVoRINewvwqtB54tGvY0wIDAQABAoIBAAomgUY9CLZKWGN8Q3G7k19cEdMY45wpK1gwtsEq4pgkF0HUruB9h4YMUWACjG7lIyCFpz4u08AC+VqX9o7iNiiRqoifosdZqBQxgil899nmiEm3Z1D8DOxbKaoFPp6Tlgrc0hetlt2/6vyVgyUp/Lc1p05XqQ/hJPbLCie5oNcmUPEg4eySkEMS2D6auHSesnowGhWWCmB9pXoayvPw26DN9/p67sKLpZC02UARoKiXDPmPT+XIIMO/UfbzZVRWwHQ3s7gCUjO1HSe7didbDZGrayPKoEjj5uShUQa08WHwvM2Oy2S4Jk9ZsNiy1i7fA6KICUMW4gs82A3UhrlAPYkCgYEA10raMNgGsY78MEfKNhtx9YVwma/Tnf6RoMTxBZRA+P7GQCd9VsNjtBn4BZebbnAm2JeBrTBPEBSlZURR5YPAoDuYBvvjrFRKJHWhxM494vfRW3gdY4umpig8UOJB2m/znlC+4slKtzGq6Hgeps1StUIqttb6nDXe+dgmVnvEvLUCgYEAxjK9DxTOMKdh48xIOGK33UaNFcowAM4rSDW7m39aS2ScL3i3simVmXrSXWWer520AtOs1Y5CmcuiGlLdh25EtvrfOz2Qghpi5bGl6ZOYvXW3skuBdI+40ay0ek/s4XVhWmoepISIaChtjJ8hirloTThduqgWs+soJA0heKNTvGcCgYAVXNkPta/cWIrPo5/+BHUnXqlQprDB4avDnycnXZGg4276mLCINnUjPtxseaGzsK86GLaGX9/IgbPzu3bA5nTrsV4he0cZJ3f/7Cg0Jh7f8aU1hVKtOQM9Q4rQn9LXAPrUf8ChMkYWrXf+/0RTWtZVJA6m++f8LiBE/Fy5giiAbQKBgGDL0Oe3qoe6h6VgVHktRUzNMwRMTatnBV5r16c2yFt/1IOeumBJzOU7RdgVVC3CoHKs/IEDzGUePZoLlGObJ/YRicp948CWsGwrmbL8waDuB/wMwjmyI3pLlY0S0ca+tAAbScHhdFkiPXZrFU+SA22LNMN/ai8OjvkkbI9lfPTLAoGBAJ6x/KX8fSb5NWuEoW4HOYi6Ojzu97z/rzOJe1T4GjYD3qwPEf1+4axd8Wf5UYrb+yqpulpZI7Ryw2AE69ELVYTN7D4pD/pEtZjovl8KXRkN0NPijfDpu2bUHTVPpIJrRBC2TXVuguJBbNVFDQeWmbnXJ8p0HLn1ElExSFrzrBKI";

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

// const nodemailer = require('nodemailer');

// async function sendEmail() {
//   try {
//     // Create a transporter
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'ojas@thinkred.tech',
//         pass: 'mlza cgki uaad slyz'
//     },
//     });

//     // Define email options
//     const mailOptions = {
//       from: 'ojas@thinkred.tech',
//       to: 'ojasaparadh185@gmail.com',
//       subject: 'Test Email',
//       text: 'This is a test email sent from nodemailer!',
//     };

//     // Send email
//     const info = await transporter.sendMail(mailOptions);
//     console.log('Email sent: ', info.messageId);
//   } catch (error) {
//     console.error('Error sending email: ', error);
//   }
// }

// // Call the function
// sendEmail();