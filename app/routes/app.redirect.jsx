import { useEffect } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";

export default function RedirectPage() {
  const app = useAppBridge();

  useEffect(() => {
    if (typeof window !== "undefined" && app) {
      import("@shopify/app-bridge/actions").then(({ Redirect }) => {
        const redirect = Redirect.create(app);
        redirect.dispatch(Redirect.Action.ADMIN_PATH, {
          path: "/apps/section-store-18",
        });
      });
    }
  }, [app]);

  return null;
}
