import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { SnackBarService } from "src/app/new-core/services/snack-bar/snack-bar.service";
import { ServiceRequest } from "../../models/request/service-request.interface";
import { ServicesModel } from "../../models/services.interfacce";
import { ServicesService } from "../../service/services.service";
import { ServiceForm } from "./service-form.form";

@Component({
  selector: "pitz-service-form",
  templateUrl: "./service-form.component.html",
  styleUrls: ["./service-form.component.scss"],
})
export class ServiceFormComponent implements OnInit {
  public serviceForm: FormGroup = ServiceForm();
  public loadingSend$ = new BehaviorSubject<boolean>(false);

  public service_id: number;
  public listServices: ServicesModel[];
  public multiple = false;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly servicesService: ServicesService,
    private readonly snackBarService: SnackBarService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.service_id = Number(params.nameService);
      if (params.nameService === "multiples") {
        this.service_id = null;
        this.multiple = true;
      }

      this.servicesService
        .getServices(this.service_id)
        .subscribe((response) => {
          this.listServices = response.data;

          if (params.service_id !== undefined) {
            this.serviceForm.get("service").setValue(Number(params.service_id));
          }
        });
    });
  }

  setServiceFunction() {
    this.serviceForm.markAllAsTouched();
    if (
      this.serviceForm.value.service !== "" &&
      this.serviceForm.value.description !== ""
    ) {
      this.loadingSend$.next(true);
      const service: ServiceRequest = {
        service_id: this.serviceForm.value.service,
        descripcion: this.serviceForm.value.description,
      };
      this.servicesService.setService(service).subscribe(
        () => {
          this.snackBarService.snackBarSuccess(
            "Solicitud enviada correctamente."
          );
          this.router.navigate(["/request"]);
        },
        (error) => {
          this.snackBarService.snackBarError(error.message);
          this.loadingSend$.next(false);
        },
        () => {
          this.loadingSend$.next(false);
        }
      );
    }
  }
}
