import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { BrandService } from "src/app/new-core/services/brand/brand.service";
import { CommuneService } from "src/app/new-core/services/commune/commune.service";
import { ModelService } from "src/app/new-core/services/model/model.service";
import { SnackBarService } from "src/app/new-core/services/snack-bar/snack-bar.service";
import { TrackingHistoryService } from "src/app/new-core/services/tracking-history/tracking-history.service";
import { requestResponseModel } from "../../models/response/request-response-model.interface";
import { RequestService } from "../../services/request/request.service";
import { RequestForm } from "./request-form.form";

@Component({
  selector: "pitz-request-view",
  templateUrl: "./request-view.component.html",
  styleUrls: ["./request-view.component.scss"],
})
export class RequestViewComponent implements OnInit {
  public requestForm: FormGroup = RequestForm();

  public timeline = false;
  public auth = false;

  public descriptionEdition = false;
  public proposalEdition = false;
  public paymentEdition = false;
  public state$ = new BehaviorSubject<string>(null);
  public brands$ = new BehaviorSubject<any>(null);
  public models$ = new BehaviorSubject<any>(null);
  public vehicles$ = new BehaviorSubject<any>([]);
  public communes$ = new BehaviorSubject<any>(null);
  public selectedVehice: any = null;

  public requestId: number;
  public request$ = new BehaviorSubject<requestResponseModel>(null);

  public isUser = false;
  public isWebUser = true;

  constructor(
    private readonly requestService: RequestService,
    private activeRoute: ActivatedRoute,
    private readonly snackBarService: SnackBarService,
    private readonly brandService: BrandService,
    private readonly modelService: ModelService,
    private readonly communeService: CommuneService,
    private readonly trackingService: TrackingHistoryService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    if (localStorage.getItem("user") !== null) {
      this.isUser = true;
      this.isWebUser = false;
    }

    this.activeRoute.paramMap.subscribe((paramMap) => {
      this.requestId = Number(paramMap.get("requestId"));
    });

    this.requestService.getRequest(this.requestId).subscribe((response) => {
      this.request$.next(response.data[0]);
      response.data[0].soL_RESPUESTA === null ||
      response.data[0].soL_RESPUESTA === ""
        ? this.requestForm.controls["proposal"].setValue(
            "Aun no se ha definido una propuesta."
          )
        : this.requestForm.controls["proposal"].setValue(
            response.data[0].soL_RESPUESTA
          );

      response.data[0].soL_PRECIO === null || response.data[0].soL_PRECIO === 0
        ? this.requestForm.controls["payment"].setValue(0)
        : this.requestForm.controls["payment"].setValue(
            response.data[0].soL_PRECIO
          );

      this.state$.next(response.data[0].soL_ESTADO);

      this.requestService
        .getVehicle(response.data[0].fK_USU_ID.usU_ID)
        .subscribe(
          (response) => {
            if (response.data.length > 0) {
              this.vehicles$.next(response.data);
            } else {
              this.vehicles$.next([]);
            }
          },
          (error) => {
            this.snackBarService.snackBarError(error.message);
          }
        );
    });

    this.brandService.getBrands().subscribe(
      (response) => {
        this.brands$.next(response.data);
      },
      (error) => {
        this.snackBarService.snackBarError(error.message);
      }
    );

    this.requestForm.controls["mark"].valueChanges.subscribe((value) => {
      this.refreshModelsArr(value);
    });

    this.communeService.getCommunes().subscribe((response) => {
      this.communes$.next(response.data);
    });
  }

  refreshModelsArr(mar_id: number) {
    this.modelService.getModels(mar_id).subscribe(
      (response) => {
        this.models$.next(response.data);
      },
      (error) => {
        this.snackBarService.snackBarError(error.message);
      }
    );
  }

  changeStatePayment() {
    const proposal: any = {
      proposal: this.requestForm.controls["proposal"].value,
      payment: this.requestForm.controls["payment"].value,
      service_status: "4",
      sol_id: this.requestId,
    };

    this.requestService.postProposalRequest(proposal).subscribe(
      (response) => {
        if (response.data) {
          this.state$.next("4");
          this.snackBarService.snackBarSuccess("pago realizado correctamente.");
        } else {
          this.snackBarService.snackBarError("Error al realizar el pago.");
        }
      },
      (error) => {
        this.snackBarService.snackBarError(error.message);
      }
    );
  }

  editDescriptionFunction() {
    this.descriptionEdition = !this.descriptionEdition;
  }

  onEnterDescription() {
    this.descriptionEdition = false;
  }

  editProposalFunction() {
    this.proposalEdition = !this.proposalEdition;
  }

  onEnterProposal() {
    const proposal: any = {
      proposal: this.requestForm.controls["proposal"].value,
      payment: this.requestForm.controls["payment"].value,
      service_status: "2",
      sol_id: this.requestId,
    };

    this.requestService.postProposalRequest(proposal).subscribe(
      (response) => {
        if (response.data) {
          this.snackBarService.snackBarSuccess(
            "propuesta guardada correctamente."
          );
        } else {
          this.snackBarService.snackBarError("Error al guardar la propuesta.");
        }
      },
      (error) => {
        this.snackBarService.snackBarError(error.message);
      }
    );
    this.proposalEdition = false;
  }

  editPaymentFunction() {
    this.paymentEdition = !this.paymentEdition;
  }

  onEnterPayment() {
    const proposal: any = {
      proposal: this.requestForm.controls["proposal"].value,
      payment: this.requestForm.controls["payment"].value,
      service_status: "2",
      sol_id: this.requestId,
    };

    if (this.requestForm.controls["payment"].value > 0) {
      this.requestForm.controls["payment"].value;

      this.requestService.postProposalRequest(proposal).subscribe(
        (response) => {
          if (response.data) {
            this.snackBarService.snackBarSuccess(
              "Pago guardado correctamente."
            );
          } else {
            this.snackBarService.snackBarError("Error al guardar el pago.");
          }
        },
        (error) => {
          this.snackBarService.snackBarError(error.message);
        }
      );
      this.paymentEdition = false;
    }
  }

  sendProposalFunction() {
    const proposal: any = {
      proposal: this.requestForm.controls["proposal"].value.trimStart(),
      payment: this.requestForm.controls["payment"].value,
      service_status: "3",
      sol_id: this.requestId,
    };
    this.requestService.postProposalRequest(proposal).subscribe(
      (response) => {
        if (response.data) {
          this.snackBarService.snackBarSuccess(
            "Propuesta Enviada Correctamente."
          );
          this.state$.next("3");
        } else {
          this.snackBarService.snackBarError("Error al enviar la propuesta.");
        }
      },
      (error) => {
        this.snackBarService.snackBarError(error.message);
      }
    );
  }

  saveVehicleInfoFunction() {
    if (
      this.requestForm.controls["mark"].value !== null &&
      this.requestForm.controls["model"].value !== null
    ) {
      let vehicleInfo: any = {
        veh_id: null,
        usu_id: this.request$.value.fK_USU_ID.usU_ID,
        mar_id: this.requestForm.controls["mark"].value,
        mod_id: this.requestForm.controls["model"].value,
        patente: this.requestForm.controls["patent"].value,
        ano: this.requestForm.controls["year"].value,
        vim: this.requestForm.controls["vin"].value,
        direccion: this.requestForm.controls["address"].value,
        numero: this.requestForm.controls["address_number"].value,
        comuna: this.requestForm.controls["commune"].value,
      };
      this.requestService.putVehicle(vehicleInfo).subscribe(
        (response) => {
          if (response.data) {
            this.snackBarService.snackBarSuccess(
              "Se ha creado el vehículo correctamente."
            );
            let dataVeh = this.getModelsAndBrands();
            let newVehicleList = [
              {
                veH_ID: response.id,
                maR_ID: vehicleInfo.mar_id,
                moD_ID: vehicleInfo.mod_id,
                veH_PATENTE: vehicleInfo.patente,
                veH_ANO: vehicleInfo.ano,
                veH_VIM: vehicleInfo.vim,
                fK_VEHICULOS_MAR_ID: {
                  maR_ID: this.requestForm.controls["mark"].value,
                  maR_NOMBRE: dataVeh.markName,
                },
                fK_VEHICULOS_MOD_ID: {
                  moD_ID: this.requestForm.controls["model"].value,
                  moD_NOMBRE: dataVeh.modelName,
                },
              },
            ];
            this.vehicles$.next([
              ...this.vehicles$.getValue(),
              ...newVehicleList,
            ]);
            this.selectedVehice = newVehicleList[0];
          }
        },
        (error) => {
          this.snackBarService.snackBarError(error.message);
        }
      );
    } else {
      this.snackBarService.snackBarWarning(
        "Debe seleccionar al menos la Marca y el Modelo del vehículo."
      );
    }
  }

  updateVehicleInfoFunction() {
    let vehicleInfo: any = {
      veh_id: this.selectedVehice.veH_ID,
      usu_id: this.request$.value.fK_USU_ID.usU_ID,
      mar_id: this.requestForm.controls["mark"].value,
      mod_id: this.requestForm.controls["model"].value,
      patente: this.requestForm.controls["patent"].value,
      ano: this.requestForm.controls["year"].value,
      vim: this.requestForm.controls["vin"].value,
      direccion: this.requestForm.controls["address"].value,
      numero: this.requestForm.controls["address_number"].value,
      comuna: this.requestForm.controls["commune"].value,
    };

    this.requestService.putVehicle(vehicleInfo).subscribe(
      (response) => {
        if (response.data) {
          this.snackBarService.snackBarSuccess(
            "Se ha actualizado la información correctamente."
          );

          let listvehicles: any = [];

          let dataVeh = this.getModelsAndBrands();

          let newVehicleList = {
            veH_ID: response.id,
            maR_ID: vehicleInfo.mar_id,
            moD_ID: vehicleInfo.mod_id,
            veH_PATENTE: vehicleInfo.patente,
            veH_ANO: vehicleInfo.ano,
            veH_VIM: vehicleInfo.vim,
            fK_VEHICULOS_MAR_ID: {
              maR_ID: this.requestForm.controls["mark"].value,
              maR_NOMBRE: dataVeh.markName,
            },
            fK_VEHICULOS_MOD_ID: {
              moD_ID: this.requestForm.controls["model"].value,
              moD_NOMBRE: dataVeh.modelName,
            },
          };

          this.vehicles$.value.forEach((vehicle) => {
            if (vehicle.veH_ID === vehicleInfo.veh_id) {
              vehicle = newVehicleList;
            }
            listvehicles.push(vehicle);
          });

          this.vehicles$.next(listvehicles);
        }
      },
      (error) => {
        this.snackBarService.snackBarError(error.message);
      }
    );
  }

  getModelsAndBrands() {
    let modelName: any;
    let markName: any;
    this.models$.subscribe((models) => {
      models.forEach((model) => {
        if (model.moD_ID === this.requestForm.controls["model"].value) {
          modelName = model.moD_NOMBRE;
        }
      });
    });

    this.brands$.subscribe((brands) => {
      brands.forEach((brand) => {
        if (brand.maR_ID === this.requestForm.controls["mark"].value) {
          markName = brand.maR_NOMBRE;
        }
      });
    });

    return {
      modelName,
      markName,
    };
  }

  setDataVehicleFormFunction(veh: any) {
    this.vehicles$.value.forEach((vehicle) => {
      if (vehicle.veH_ID === veh.veH_ID) {
        this.requestForm.controls["mark"].setValue(veh.maR_ID);
        this.requestForm.controls["model"].setValue(veh.moD_ID);
        this.requestForm.controls["patent"].setValue(veh.veH_PATENTE);
        this.requestForm.controls["year"].setValue(veh.veH_ANO);
        this.requestForm.controls["vin"].setValue(veh.veH_VIM);
        this.requestForm.controls["address"].setValue(
          this.request$.value.fK_USU_ID.usU_DIRECCION
        );
        this.requestForm.controls["address_number"].setValue(
          this.request$.value.fK_USU_ID.usU_DIRECCION_NUMERO
        );
        this.requestForm.controls["commune"].setValue(
          this.request$.value.fK_USU_ID.coM_ID
        );

        this.selectedVehice = veh;
      }
    });
  }

  changeStatusHistoryFunction() {
    if (this.requestForm.controls["status"].value.trimStart() !== "") {
      const history: any = {
        his_mensaje: this.requestForm.controls["status"].value,
        sol_id: this.requestId,
      };

      this.trackingService.postTrackingHistoryMessage(history).subscribe(
        (response) => {
          if (response.data) {
            this.snackBarService.snackBarSuccess(
              "Se ha enviado el estado correctamente."
            );
            this.requestForm.controls["status"].reset();
          } else {
            this.snackBarService.snackBarError("Error al enviar el estado.");
          }
        },
        (error) => {
          this.snackBarService.snackBarError(error.message);
        }
      );
    } else {
      this.snackBarService.snackBarError("El texto no puede estar en blanco.");
    }
  }

  finishServiceFunction() {
    const proposal: any = {
      proposal: this.requestForm.controls["proposal"].value,
      payment: this.requestForm.controls["payment"].value,
      service_status: "5",
      sol_id: this.requestId,
    };
    this.requestService.postProposalRequest(proposal).subscribe(
      (response) => {
        if (response.data) {
          this.snackBarService.snackBarSuccess(
            "Estado cambiado correctamente."
          );
          this.state$.next("" + this.requestForm.controls["state"].value);
          this.router.navigate(["/auth/dashboard"]);
        } else {
          this.snackBarService.snackBarError("Error al cambiar el estado.");
        }
      },
      (error) => {
        this.snackBarService.snackBarError(error.message);
      }
    );
  }
}
