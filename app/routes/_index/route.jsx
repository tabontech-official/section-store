// import { redirect } from "@remix-run/node";
// import { Form, useLoaderData } from "@remix-run/react";
// import { login } from "../../shopify.server";
// import styles from "./styles.module.css";

// export const loader = async ({ request }) => {
//   const url = new URL(request.url);

//   if (url.searchParams.get("shop")) {
//     throw redirect(`/app?${url.searchParams.toString()}`);
//   }

//   return { showForm: Boolean(login) };
// };

// export default function App() {
//   const { showForm } = useLoaderData();

//   return (
//     <div className={styles.index}>
//       <div className={styles.content}>
//         <h1 className={styles.heading}>A short heading about [your app]</h1>
//         <p className={styles.text}>
//           A tagline about [your app] that describes your value proposition.
//         </p>
//         {showForm && (
//           <Form className={styles.form} method="post" action="/auth/login">
//             <label className={styles.label}>
//               <span>Shop domain</span>
//               <input className={styles.input} type="text" name="shop" />
//               <span>e.g: my-shop-domain.myshopify.com</span>
//             </label>
//             <button className={styles.button} type="submit">
//               Log in
//             </button>
//           </Form>
//         )}
//         <ul className={styles.list}>
//           <li>
//             <strong>Product feature</strong>. Some detail about your feature and
//             its benefit to your customer.
//           </li>
//           <li>
//             <strong>Product feature</strong>. Some detail about your feature and
//             its benefit to your customer.
//           </li>
//           <li>
//             <strong>Product feature</strong>. Some detail about your feature and
//             its benefit to your customer.
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// }
import { redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { login } from "../../shopify.server";

export const loader = async ({ request }) => {
  const url = new URL(request.url);

  if (url.searchParams.get("shop")) {
    throw redirect(`/app?${url.searchParams.toString()}`);
  }

  return { showForm: Boolean(login) };
};

export default function IndexPage() {
  const { showForm } = useLoaderData();

  return (
    <div
      style={{
        fontFamily: "Inter, sans-serif",
        background: "#f9fafb",
        minHeight: "98vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h2 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "15px" }}>
          Sectify AI – Theme Builder
        </h2>
        <p style={{ fontSize: "0.95rem", marginBottom: "20px", color: "#374151" }}>
          Enter your shop domain to log in or install this app.
        </p>

        {showForm && (
          <Form method="post" action="/auth/login">
            <input
              type="text"
              name="shop"
              placeholder="example.myshopify.com"
              style={{
                width: "93%",
                padding: "10px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                marginBottom: "15px",
                fontSize: "0.95rem",
              }}
            />
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "#008060",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Install App
            </button>
          </Form>
        )}
      </div>
    </div>
  );
}
