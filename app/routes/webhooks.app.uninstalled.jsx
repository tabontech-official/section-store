import { authenticate } from "../shopify.server";
import db from "../db.server";
import nodemailer from "nodemailer";

export const action = async ({ request }) => {
  try {
    console.log('Webhook request received:', request);

    const { shop, session, topic } = await authenticate.webhook(request);
    console.log(`Received ${topic} webhook for ${shop}`);

    if (session) {
      await db.session.deleteMany({ where: { shop } });

      const installedShop = await db.installedShops.findUnique({
        where: { shop },
      });

      if (installedShop) {
        console.log(`Deleting installed shop record for ${installedShop.shop}`);
        await db.installedShops.deleteMany({ where: { shop } });

        await sendUninstallMail(installedShop);
      }

      return new Response('App uninstalled', { status: 200 });
    } else {
      console.error('No session found for shop:', shop);
      return new Response('No valid session', { status: 400 });
    }
  } catch (error) {
    console.error('Error handling app uninstall webhook:', error);
    return new Response("Error processing webhook", { status: 500 });
  }
};

async function sendUninstallMail(installedShop) {
  try {
    console.log('Preparing to send uninstall email...');
    const transporter = nodemailer.createTransport({
      service: "Gmail", 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Shopify App" <${process.env.EMAIL_USER}>`,
      to: "2014tabontech@gmail.com", 
      subject: `App Uninstalled: ${installedShop.shop}`,
      text: `
App has been uninstalled.

Shop: ${installedShop.shop}
Email: ${installedShop.email || "N/A"}
Domain: ${installedShop.domain || "N/A"}
MyShopify Domain: ${installedShop.myshopifyDomain || "N/A"}

Uninstalled at: ${new Date().toISOString()}
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Uninstall email sent successfully.");
  } catch (error) {
    console.error("Error sending uninstall email:", error);
  }
}
