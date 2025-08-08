import db from "../db.server";


export const action = async ({ request }) => {
  try {
    const body = await request.json();
    console.log("Incoming Request Body:", body);

    const {
      shop_id,
      shop_domain,
      orders_requested,
      customer,
      data_request
    } = body;

    if (!shop_id || !shop_domain || !customer || !data_request) {
      return new Response("Missing required fields", { status: 400 });
    }

    const dataRequestDoc = {
      shop_id,
      shop_domain,
      topic: "customers/data_request",  
      orders_requested,
      customerId: customer.id,
      customerEmail: customer.email,
      customerPhone: customer.phone,
      dataRequestId: data_request.id,
      createdAt: new Date(),
    };

    const customerDataRequest = await db.customerDataRequest.create({
      data: dataRequestDoc,
    });

    console.log("Customer data request processed and stored:", customerDataRequest);

    return new Response("Customer data request processed and stored", { status: 200 });

  } catch (error) {
    console.error("Error processing customer data request:", error.message);

    return new Response("Error processing request", { status: 500 });
  }
};