import { redirect } from "@remix-run/node";
import nodemailer from "nodemailer";
import db from "../db.server"; 
import axios from 'axios'; 

const sendEmail = async (recipientEmail, subject, body) => {
  console.log("Setting up email transport...");
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

  try {
    console.log("Sending email...");
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const API_KEY = process.env.SHOPIFY_API_KEY; 
const SCOPES = "write_products,read_themes,write_themes"; 
const SHOPIFY_REDIRECT_URI = process.env.SHOPIFY_REDIRECT_URI; 
export const loader = async ({ request }) => {
  console.log("Loader function started...");

  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");
  console.log("Shop parameter:", shop);

  if (!shop) {
    console.log("No shop parameter provided, redirecting to error...");
    return redirect("/error"); 
  }

  const code = url.searchParams.get("code");
  console.log("Authorization code:", code);

  if (!code) {
    console.error("No authorization code provided.");
    return redirect("/error"); 
  }

  console.log(`Sending request to Shopify to get access token for shop: ${shop}`);
  
  try {
    const response = await axios.post(
      `https://${shop}/admin/oauth/access_token`,
      {
        client_id: process.env.SHOPIFY_API_KEY,
        client_secret: process.env.SHOPIFY_API_SECRET,
        code, 
      },
    );
    
    console.log("Shopify API response for access token:", response.data);
  
    const { access_token, scope, expires_in } = response.data;
    console.log("Received access_token:", access_token);
    console.log("Received scope:", scope);
    console.log("Received expires_in:", expires_in);

    const userResponse = await axios.get(
      `https://${shop}/admin/api/2021-07/shop.json`,
      {
        headers: {
          "X-Shopify-Access-Token": access_token,
        },
      },
    );
    console.log("User response data from Shopify:", userResponse.data);

    const { first_name, last_name, email, locale } = userResponse.data.shop;
    console.log("Extracted user info:", first_name, last_name, email, locale);

    console.log("Saving session in the database...");
    await db.session.create({
      data: {
        shop,
        accessToken: access_token,
        scope,
        expires: new Date(Date.now() + expires_in * 1000), 
        firstName: first_name,
        lastName: last_name,
        email,
        locale,
        accountOwner: true,
        emailVerified: true,
        isOnline: true,
      },
    });
    console.log("Session saved in the database.");

    const installUrl =  `https://${session.shop}/admin/oauth/redirect_from_cli?client_id=${process.env.SHOPIFY_API_KEY}`;
    console.log("Redirecting to install URL:", installUrl);

    const adminSubject = "A New Shopify Store is Installing Your App";
    const adminBody = `A new Shopify store, ${shop}, is starting the installation of your app. Please review their installation process.`;
    console.log("Sending email to admin...");
    await sendEmail(process.env.EMAIL_USER, adminSubject, adminBody); 
    console.log("Email sent to admin.");

    return redirect(installUrl); 

  } catch (error) {
    console.error("Error during Shopify OAuth request:", error);
    return redirect("/error"); 
  }
};
