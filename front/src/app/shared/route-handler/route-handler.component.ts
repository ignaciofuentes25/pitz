import { Component, OnInit } from "@angular/core";
import { SidenavItem } from "../sidenav/sidenav-item/sidenav-item.model";
import * as fromRoot from "../../reducers/index";
import * as fromSidenav from "../sidenav/shared/sidenav.action";
import { Store } from "@ngrx/store";
import { ServicesService } from "src/app/features/service/service/services.service";
import { ServicesModel } from "src/app/features/service/models/services.interfacce";

@Component({
  selector: "pitz-route-handler",
  templateUrl: "./route-handler.component.html",
  styleUrls: ["./route-handler.component.scss"],
})
export class RouteHandlerComponent implements OnInit {
  private listServices: ServicesModel[];

  constructor(
    private store: Store<fromRoot.State>,
    private readonly servicesService: ServicesService
  ) {}

  ngOnInit() {
    const services = new SidenavItem({
      name: "Servicios",
      icon: "expand_more",
      subItems: [],
      position: 3,
    });

    const servicesSubItems = [];

    this.servicesService.getServices(null).subscribe((response) => {
      this.listServices = response.data;

      for (const service of this.listServices) {
        servicesSubItems.push(
          new SidenavItem({
            name: service.seR_NOMBRE,
            route: `/${service.fK_SER_AGROUP_ID}/service/${service.seR_ID}`,
            parent: services,
            subItems: [],
            position: 1,
          })
        );
      }

      services.subItems.push(...servicesSubItems);

      this.store.dispatch(new fromSidenav.AddSidenavItemAction(services));
    });

    // Follow

    const follow = new SidenavItem({
      name: "Siganos",
      icon: "expand_more",
      subItems: [],
      position: 4,
    });

    const followSubItems = [
      new SidenavItem({
        name: "Facebook",
        route: "/ff",
        parent: services,
        subItems: [],
        position: 1,
      }),
      new SidenavItem({
        name: "Instagram",
        route: "/fi",
        parent: services,
        subItems: [],
        position: 1,
      }),
    ];

    follow.subItems.push(...followSubItems);

    // Donwload

    const download = new SidenavItem({
      name: "Descarga App",
      icon: null,
      route: "/download",
      subItems: [],
      position: 5,
    });

    const downloadSubItems = [];

    download.subItems.push(...downloadSubItems);

    // LOGIN

    const login = new SidenavItem({
      name: "Login",
      icon: null,
      route: "/login",
      subItems: [],
      position: 1,
    });

    const loginSubItems = [];

    login.subItems.push(...loginSubItems);

    // REGISTER

    const register = new SidenavItem({
      name: "Register",
      icon: null,
      route: "/register",
      subItems: [],
      position: 2,
    });

    const registerSubItems = [];

    register.subItems.push(...registerSubItems);

    // CERRAR SESION

    const logout = new SidenavItem({
      name: "Cerrar Sesión",
      icon: null,
      route: "/home",
      subItems: [],
      position: 6,
    });

    const logoutSubItems = [];

    logout.subItems.push(...logoutSubItems);

    this.store.dispatch(new fromSidenav.AddSidenavItemAction(login));
    this.store.dispatch(new fromSidenav.AddSidenavItemAction(register));
    this.store.dispatch(new fromSidenav.AddSidenavItemAction(follow));
    //sthis.store.dispatch(new fromSidenav.AddSidenavItemAction(download));
    this.store.dispatch(new fromSidenav.AddSidenavItemAction(logout));
  }
}
