import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { NgModule } from "@angular/core";
import { AdminCentralizedComponent } from "./admin-centralized/admin-centralized.component";
import { PitzerFormComponent } from "./admin-centralized/pitzer/pitzer-form/pitzer-form.component";

const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
  },
  {
    path: "user",
    component: AdminCentralizedComponent,
  },
  {
    path: "user/create",
    component: PitzerFormComponent,
  },
  {
    path: "user/:userId/view",
    component: PitzerFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
