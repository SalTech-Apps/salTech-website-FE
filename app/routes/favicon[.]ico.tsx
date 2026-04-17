import { redirect } from "react-router";

export function loader() {
  return redirect("/assets/logo/logo-transparent.png", 301);
}
