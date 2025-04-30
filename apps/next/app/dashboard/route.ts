import { redirect } from "next/navigation";
import { navLinks as equityNavLinks } from "@/app/equity";
import { currentUserSchema } from "@/models/user";
import { assertDefined } from "@/utils/assert";
// import { internal_current_user_data_url } from "@/utils/routes";

export async function GET(req: Request) {

  // const host = req.headers.get("Host") ?? "localhost:3000";
  // const path = internal_current_user_data_url();
  // const url = railsUrl(path, host);

  // console.log("url here:",url)

  // const response = await fetch(url, {
  //   headers: {
  //     cookie: req.headers.get("cookie") ?? "",
  //     "User-Agent": req.headers.get("User-Agent") ?? "",
  //     referer: "x", // work around a Clerk limitation
  //   },
  // });

  const host = "127.0.0.1:3000"; // Hardcode backend host for now (Rails dev)
  const url = `http://${host}/internal/current_user_data`;

  const response = await fetch(url, {
    headers: {
      cookie: req.headers.get("cookie") ?? "",
      "User-Agent": req.headers.get("User-Agent") ?? "",
      referer: "x", // work around a Clerk limitation
    },
  });

  if (!response.ok) return redirect("/login");
  const user = currentUserSchema.parse(await response.json());
  if (user.onboardingPath) return redirect(user.onboardingPath);
  if (user.roles.worker?.inviting_company) {
    return redirect("/company_invitations");
  }
  if (!user.currentCompanyId) {
    return redirect("/settings");
  }
  
  //if (user.activeRole === "administrator") {
    // return redirect("/invoices");
  // }

  if (user.activeRole === "lawyer") {
    return redirect("/documents");
  }
  if (user.roles.worker) {
    return redirect("/invoices");
  }
  const company = assertDefined(user.companies.find((company) => company.id === user.currentCompanyId));
  return redirect(assertDefined(equityNavLinks(user, company)[0]?.route));
}