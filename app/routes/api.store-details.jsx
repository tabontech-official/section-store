// // app/routes/callback.tsx
// import { json } from "@remix-run/node";
// import { authenticate } from "../shopify.server";
// import db from "../db.server";
// import nodemailer from "nodemailer";

// // 🔹 Email sender setup (use apna SMTP ya SendGrid/Resend)
// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com", // example Gmail SMTP
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.EMAIL_USER, // apka email
//     pass: process.env.EMAIL_PASS, // app password
//   },
// });

// export const loader = async ({ request }) => {
//   const { session } = await authenticate.admin(request);
//   const shop = session.shop;

//   // 🔹 Shopify API se shop.json fetch karo
//   const response = await fetch(
//     `https://${shop}/admin/api/2025-01/shop.json`,
//     {
//       headers: {
//         "X-Shopify-Access-Token": session.accessToken,
//         "Content-Type": "application/json",
//       },
//     }
//   );

//   const data = await response.json();
//   const shopData = data.shop;

//   const email = shopData.email;
//   const domain = shopData.domain;
//   const myshopifyDomain = shopData.myshopify_domain;

//   const existingShop = await db.installedShops.findUnique({
//     where: { shop: myshopifyDomain },
//   });

//   if (existingShop) {
//     return json({
//       success: false,
//       message: "Shop already installed, skipping emails.",
//       shop: shopData,
//     });
//   }

//   await db.installedShops.create({
//     data: {
//       shop: myshopifyDomain,
//       email,
//       domain,
//       myshopifyDomain,
//     },
//   });

//   await transporter.sendMail({
//     from: `"Your App" <${process.env.EMAIL_USER}>`,
//     to: email,
//     subject: "App Installed Successfully ",
//     text: `Hello, your app has been installed successfully on ${domain}.`,
//   });

//   await transporter.sendMail({
//     from: `"Your App" <${process.env.EMAIL_USER}>`,
//     to: "2014tabontech@gmail.com",
//     subject: "New App Installation ",
//     text: `New installation detected!\n\nShop: ${domain}\nEmail: ${email}\nMyShopify Domain: ${myshopifyDomain}`,
//   });

//   return json({
//     success: true,
//     shop: shopData,
//   });
// };
// app/routes/callback.tsx
import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", 
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const shop = session.shop;

  const response = await fetch(
    `https://${shop}/admin/api/2025-01/shop.json`,
    {
      headers: {
        "X-Shopify-Access-Token": session.accessToken,
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();
  const shopData = data.shop;

  const email = shopData.email;
  const domain = shopData.domain;
  const myshopifyDomain = shopData.myshopify_domain;


  await transporter.sendMail({
    from: `"Your App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "App Installed Successfully ",
    text: `Hello, your app has been installed successfully on ${domain}.`,
  });

  await transporter.sendMail({
    from: `"Your App" <${process.env.EMAIL_USER}>`,
    to: "2014tabontech@gmail.com",
    subject: "New App Installation ",
    text: `New installation detected!\n\nShop: ${domain}\nEmail: ${email}\nMyShopify Domain: ${myshopifyDomain}`,
  });

  return json({
    success: true,
    message: "Emails sent successfully",
    shop: shopData,
  });
};
