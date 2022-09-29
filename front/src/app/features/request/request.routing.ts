import { RouterModule, Routes } from "@angular/router";
import { RequestComponent } from "./request.component";
import { NgModule } from "@angular/core";
import { RequestViewComponent } from "./components/view-request/request-view.component";
import { ListRequestComponent } from "./components/list-request/list-request.component";
import { PageRestrictionGuard } from "src/app/new-core/guards/page-restriction/page-restriction.guard";

const routes: Routes = [
  {
    path: "",
    component: RequestComponent,
    children: [
      {
        path: "",
        component: ListRequestComponent,
      },
      {
        path: ":requestId/view",
        component: RequestViewComponent,
      },
    ],
    canActivate: [PageRestrictionGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestRoutingModule {}
