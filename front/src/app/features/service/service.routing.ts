import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { ServiceComponent } from "./service.component";
import { ServiceFormComponent } from "./components/service-form/service-form.component";
import { PageRestrictionGuard } from "src/app/new-core/guards/page-restriction/page-restriction.guard";

const routes: Routes = [
  {
    path: "",
    component: ServiceComponent,
    children: [
      {
        path: "",
        component: ServiceFormComponent,
      },
    ],
    canActivate: [PageRestrictionGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceRoutingModule {}
