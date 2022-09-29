import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from "./features/layout/layout.component";
import { authRoutes } from "./administration/auth/auth.routing";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./features/home/home.module").then((m) => m.HomeModule),
        pathMatch: "full",
      },
      {
        path: "register",
        loadChildren: () =>
          import("./features/register/register.module").then(
            (m) => m.RegisterModule
          ),
      },
      {
        path: "login",
        loadChildren: () =>
          import("./features/login/login.module").then((m) => m.LoginModule),
      },
      {
        path: "settings",
        loadChildren: () =>
          import("./features/settings/settings.module").then(
            (m) => m.SettingsModule
          ),
      },
      {
        path: "request",
        loadChildren: () =>
          import("./features/request/request.module").then(
            (m) => m.RequestModule
          ),
      },
      {
        path: ":nameService/service/:service_id",
        loadChildren: () =>
          import("./features/service/service.module").then(
            (m) => m.ServiceModule
          ),
      },
      {
        path: ":nameService/service",
        loadChildren: () =>
          import("./features/service/service.module").then(
            (m) => m.ServiceModule
          ),
      },
    ],
  },
  {
    path: "auth",
    children: [...authRoutes],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // initialNavigation: 'enabled',
      // preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: "top",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
