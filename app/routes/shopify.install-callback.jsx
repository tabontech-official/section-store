import { json, redirect } from "@remix-run/node";
import db from "../db.server";  // Prisma client for database access
import axios from "axios"; // Axios for making API requests to Shopify
import nodemailer from "nodemailer"; // Nodemailer for sending emails

// Email sending logic
const sendEmail = async (recipientEmail, subject, body) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipientEmail,
    subject: subject,
    text: body,
  };

  await transporter.sendMail(mailOptions);
};

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const { shop, code, state } = Object.fromEntries(url.searchParams);

  console.log("Received installation callback from shop:", shop);

  if (!shop) {
    console.error("Error: Missing 'shop' parameter in the URL.");
    return json({ error: "Shop parameter is missing." }, { status: 400 });
  }

  try {
    console.log("Exchanging authorization code for access token...");

    // Exchange the authorization code for an access token
    const response = await axios.post(`https://${shop}/admin/oauth/access_token`, {
      client_id: process.env.SHOPIFY_API_KEY,
      client_secret: process.env.SHOPIFY_API_SECRET,
      code,
    });

    const { access_token, scope, expires_in } = response.data;

    console.log("Access token received:", access_token);

    // Get additional user info from Shopify API
    console.log("Fetching additional shop details from Shopify...");
    const userResponse = await axios.get(`https://${shop}/admin/api/2021-07/shop.json`, {
      headers: {
        "X-Shopify-Access-Token": access_token,
      },
    });

    const { first_name, last_name, email, locale } = userResponse.data.shop;
    console.log("Fetched shop details: first_name =", first_name, "last_name =", last_name, "email =", email);

    // Save session data in the database
    console.log("Saving session data in the database...");
    await db.session.create({
      data: {
        shop,
        state,
        accessToken: access_token,
        scope,
        expires: new Date(Date.now() + expires_in * 1000), // Set expiry time based on access token expiration
        firstName: first_name,
        lastName: last_name,
        email,
        locale,
        accountOwner: true,
        emailVerified: true,
        isOnline: true,
      },
    });

    console.log("Session data saved successfully for shop:", shop);

    // Send email to the customer (shop owner)
    const customerSubject = "Your Shopify App has been successfully installed!";
    const customerBody = `Hello, your shop ${shop} has successfully installed the app.`;
    console.log("Sending email to shop owner:", shop);
    await sendEmail(shop, customerSubject, customerBody);

    // Send email to you (the app admin)
    const adminSubject = "New Shopify App Installation";
    const adminBody = `A new shop (${shop}) has installed your app.`;
    console.log("Sending email to admin...");
    await sendEmail("your-email@example.com", adminSubject, adminBody);

    console.log("Redirecting to the app dashboard...");
    // Redirect to the app dashboard or Shopify's admin apps page
    return redirect(`https://${shop}/admin/apps/${process.env.SHOPIFY_API_KEY}`);
  } catch (error) {
    console.error("Installation callback failed:", error.message);
    return json({ error: "Failed to handle app installation", details: error.message }, { status: 500 });
  }
};
