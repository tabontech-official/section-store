import { redirect, json } from "@remix-run/node";
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
  console.log("🚀 [Loader] App installation callback triggered");

  try {
    console.log("🔑 Authenticating admin session...");
    const { session } = await authenticate.admin(request);
    console.log("✅ Admin session authenticated:", session);

    const shop = session.shop;
    console.log(`🏬 Shop identified: ${shop}`);

    console.log("🌐 Fetching shop.json from Shopify Admin API...");
    const response = await fetch(
      `https://${shop}/admin/api/2024-10/shop.json`,
      {
        headers: {
          "X-Shopify-Access-Token": session.accessToken,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("📡 Response status from shop.json API:", response.status);

    if (!response.ok) {
      const errText = await response.text();
      console.error("❌ Failed to fetch shop.json", errText);
      return json({ success: false, message: "Could not fetch shop details" });
    }

    const data = await response.json();
    const { shop: shopData } = data;

    console.log("✅ Shop Data received:", shopData);

    const merchantEmail = shopData.email;
    const domain = shopData.domain;
    const myshopifyDomain = shopData.myshopify_domain;

    console.log(`📧 Preparing to send installation email to merchant: ${merchantEmail}`);
    await transporter.sendMail({
      from: `"Sectify AI" <${process.env.EMAIL_USER}>`,
      to: merchantEmail,
      subject: "🎉 Your App Installed Successfully",
      text: `Hello ${shopData.name}, 

Your app has been installed successfully on your store (${domain}).

You can now customize sections using the app in your Shopify theme editor.

Thanks for installing!
- Sectify AI`,
    });
    console.log("✅ Email sent to merchant:", merchantEmail);

    console.log("📧 Preparing to send installation alert email to owner: 2014tabontech@gmail.com");
    await transporter.sendMail({
      from: `"Sectify AI" <${process.env.EMAIL_USER}>`,
      to: "2014tabontech@gmail.com",
      subject: "📩 New App Installation",
      text: `A new store just installed the app! 🚀

Shop Name: ${shopData.name}
Domain: ${domain}
MyShopify Domain: ${myshopifyDomain}
Email: ${merchantEmail}`,
    });
    console.log("✅ Alert email sent to app owner");

    console.log("🎯 Installation flow complete. Redirecting merchant back to Shopify Admin...");

    return redirect(
      `https://${session.shop}/admin/oauth/redirect_from_cli?client_id=${process.env.SHOPIFY_API_KEY}`
    );
  } catch (error) {
    console.error("💥 Error in auth.callback:", error);
    return json({ success: false, message: "Something went wrong" });
  } finally {
    console.log("🏁 [Loader] Installation callback finished");
  }
};
