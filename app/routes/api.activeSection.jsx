
// import { json } from "@remix-run/node";
// import { authenticate } from "../shopify.server";

// export async function action({ request }) {
//   const { admin } = await authenticate.admin(request);
//   const body = await request.json();
//   const { sectionHandle, status } = body;

//   if (!sectionHandle || !["active", "inactive"].includes(status)) {
//     return json({ error: "Invalid sectionHandle or status" }, { status: 400 });
//   }

//   try {
//     // Step 1: Check if the metafield definition exists
//     const metafieldDefinitionsQuery = `
//       query MetafieldDefinitions($ownerType: MetafieldOwnerType!, $first: Int) {
//         metafieldDefinitions(ownerType: $ownerType, first: $first) {
//           nodes {
//             name
//             namespace
//             key
//             type {
//               name
//             }
//           }
//         }
//       }
//     `;
    
//     const variablesQuery = {
//       ownerType: "SHOP", // Assuming it's for the shop (you can change it to PRODUCT if needed)
//       first: 2, // Fetch up to 2 metafield definitions for this example
//     };

//     console.log("Sending query to check metafield definitions:", variablesQuery);

//     const responseQuery = await admin.graphql(metafieldDefinitionsQuery, { variables: variablesQuery });
//     const metafieldDefinitions = await responseQuery.json();

//     console.log("Metafield definitions response:", metafieldDefinitions);

//     // Step 2: Check if the metafield already exists
//     const existingMetafield = metafieldDefinitions.data.metafieldDefinitions.nodes.find(
//       (node) => node.key === `section_status_${sectionHandle}`
//     );

//     if (existingMetafield) {
//       console.log("Metafield exists, updating it...");

//       // Step 3: Update the existing metafield
//       const updateMetafieldMutation = `
//         mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
//           metafieldsSet(metafields: $metafields) {
//             metafields {
//               namespace
//               key
//               value
//               type
//             }
//             userErrors {
//               field
//               message
//             }
//           }
//         }
//       `;

//       const variables = {
//         metafields: [
//           {
//             namespace: "custom",
//             key: `section_status_${sectionHandle}`,
//             type: "single_line_text_field",
//             value: status,  // Update to 'active' or 'inactive'
//             ownerId: "gid://shopify/Shop/65412104348", // Replace with actual ownerId
//           },
//         ],
//       };

//       console.log("Sending mutation to update metafield:", variables);

//       const response = await admin.graphql(updateMetafieldMutation, { variables });
//       const result = await response.json();

//       console.log("Update metafield response:", result);

//       const errors = result?.data?.metafieldsSet?.userErrors;

//       if (errors && errors.length > 0) {
//         console.error("Error updating metafield:", errors);
//         return json({ success: false, errors }, { status: 400 });
//       }

//       return json({ success: true, saved: result.data.metafieldsSet.metafields[0] });
//     } else {
//       // Step 4: Create a new metafield if it doesn't exist
//       console.log("Metafield does not exist, creating it...");

//       const createMetafieldMutation = `
//         mutation CreateMetafieldDefinition($definition: MetafieldDefinitionInput!) {
//           metafieldDefinitionCreate(definition: $definition) {
//             createdDefinition {
//               id
//               name
//             }
//             userErrors {
//               field
//               message
//               code
//             }
//           }
//         }
//       `;
      
//       const variablesCreate = {
//         definition: {
//           name: `Section Status ${sectionHandle}`,
//           namespace: "custom",
//           key: `section_status_${sectionHandle}`,
//           type: "single_line_text_field",
//           ownerType: "SHOP",
//         },
//       };

//       console.log("Sending mutation to create metafield:", variablesCreate);

//       const createResponse = await admin.graphql(createMetafieldMutation, { variables: variablesCreate });
//       const createResult = await createResponse.json();

//       console.log("Create metafield response:", createResult);

//       const createErrors = createResult?.data?.metafieldDefinitionCreate?.userErrors;

//       if (createErrors && createErrors.length > 0) {
//         console.error("Error creating metafield:", createErrors);
//         return json({ success: false, errors: createErrors }, { status: 400 });
//       }

//       // Step 5: Now update the created metafield with the desired status
//       const updateMetafieldAfterCreateMutation = `
//         mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
//           metafieldsSet(metafields: $metafields) {
//             metafields {
//               namespace
//               key
//               value
//               type
//             }
//             userErrors {
//               field
//               message
//             }
//           }
//         }
//       `;
      
//       const variablesUpdateAfterCreate = {
//         metafields: [
//           {
//             namespace: "custom",
//             key: `section_status_${sectionHandle}`,
//             type: "single_line_text_field",
//             value: status,  // Set to 'active' or 'inactive'
//             ownerId: "gid://shopify/Shop/65412104348", // Replace with actual ownerId
//           },
//         ],
//       };

//       const responseAfterCreate = await admin.graphql(updateMetafieldAfterCreateMutation, { variables: variablesUpdateAfterCreate });
//       const resultAfterCreate = await responseAfterCreate.json();

//       console.log("Update metafield after create response:", resultAfterCreate);

//       const errorsAfterCreate = resultAfterCreate?.data?.metafieldsSet?.userErrors;

//       if (errorsAfterCreate && errorsAfterCreate.length > 0) {
//         console.error("Error updating metafield after creation:", errorsAfterCreate);
//         return json({ success: false, errors: errorsAfterCreate }, { status: 400 });
//       }

//       return json({ success: true, saved: resultAfterCreate.data.metafieldsSet.metafields[0] });
//     }
//   } catch (error) {
//     console.error("Metafield Set Error", error);
//     return json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }



import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import db from "../db.server";


export async function action({ request }) {
  const { admin } = await authenticate.admin(request);
  const body = await request.json();
const { sectionHandle, status, imageUrl } = body;

  if (!sectionHandle || !["active", "inactive"].includes(status)) {
    return json({ error: "Invalid sectionHandle or status" }, { status: 400 });
  }

  try {
 const savedSection = await db.sectionStatus.upsert({
  where: { sectionHandle },
  update: { status, imageUrl },
  create: { sectionHandle, status, imageUrl },
});

    return json({ success: true, saved: savedSection });
  } catch (error) {
    console.error("Error saving to Prisma", error);
    return json({ error: "Internal Server Error" }, { status: 500 });
  }
}



export async function loader() {
  try {
    const allSections = await db.sectionStatus.findMany();
    return json({ sections: allSections });
  } catch (error) {
    console.error("Error fetching section statuses:", error);
    return json({ error: "Internal Server Error" }, { status: 500 });
  }
}