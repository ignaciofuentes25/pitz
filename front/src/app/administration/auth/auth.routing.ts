import { Routes } from "@angular/router";
import { DashboardRestrictionGuard } from "src/app/new-core/guards/page-restriction/dashboard-restriction.guard copy";
import { LayoutComponent } from "../layout/layout.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { LoginComponent } from "./login/login.component";
import { dashboardRoutes } from "../dashboard/dashboard.routing";

export const authRoutes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "forgot-password",
    component: ForgotPasswordComponent,
  },
  {
    path: "dashboard",
    component: LayoutComponent,
    children: [...dashboardRoutes],
    // children: [
    //   {
    //     path: "",
    //     loadChildren: () =>
    //       import("../dashboard/dashboard.module").then(
    //         (m) => m.DashboardModule
    //       ),
    //   },
    //   {
    //     path: ":requestId/view",
    //     component: RequestViewComponent,
    //   },
    // ],
    canActivate: [DashboardRestrictionGuard],
  },
];
