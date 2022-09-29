import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { RequestViewComponent } from "src/app/features/request/components/view-request/request-view.component";

export const dashboardRoutes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./admin/admin.module").then((m) => m.AdminModule),
  },
  {
    path: ":requestId/view",
    component: RequestViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
