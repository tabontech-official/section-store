import db from "../db.server";


export const action = async ({ request }) => {
  try {
    const body = await request.json();
    console.log("Incoming Redact Request Body:", body);

    const {
      shop_id,
      shop_domain,
      customer,
      data_request,
    } = body;

    if (!shop_id || !shop_domain || !customer || !data_request) {
      return new Response("Missing required fields", { status: 400 });
    }

    const customerId = customer.id;

    const customerDataRequest = await db.customerDataRequest.findFirst({
      where: {
        shop_id,
        customerId,
      },
    });

    if (!customerDataRequest) {
      return new Response("Customer data request not found", { status: 404 });
    }

    const updatedCustomer = await prisma.customerDataRequest.update({
      where: { id: customerDataRequest.id },
      data: {
        customerEmail: 'REDACTED', 
        customerPhone: 'REDACTED',
        customerId: 'REDACTED',
      },
    });

    console.log("Customer data redacted:", updatedCustomer);

    return new Response("Customer data redacted successfully", { status: 200 });
    
  } catch (error) {
    console.error("Error processing customer redaction:", error.message);

    return new Response("Error processing request", { status: 500 });
  }
};