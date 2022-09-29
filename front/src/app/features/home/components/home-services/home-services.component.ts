import { Component, Input, OnInit } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "pitz-home-services",
  templateUrl: "./home-services.component.html",
  styleUrls: ["./home-services.component.scss"],
})
export class HomeServicesComponent implements OnInit {
  @Input() icon: string;
  @Input() message: string;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry
      .addSvgIcon(
        `servicio-general_001`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          "../../../../assets/img/icons/icono_servicio-general_001.svg"
        )
      )
      .addSvgIcon(
        `servicio-general_002`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          "../../../../assets/img/icons/icono_servicio.svg"
        )
      )
      .addSvgIcon(
        `servicio-general_003`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          "../../../../assets/img/icons/icono_servicio-general_003.svg"
        )
      )
      .addSvgIcon(
        `servicio-general_004`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          "../../../../assets/img/icons/icono_servicio-general_004.svg"
        )
      )
      .addSvgIcon(
        `servicio-general_005`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          "../../../../assets/img/icons/icono_servicio-general_005.svg"
        )
      )
      .addSvgIcon(
        `servicio-general_006`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          "../../../../assets/img/icons/icono_servicio-general_006.svg"
        )
      )
      .addSvgIcon(
        `servicio-general_007`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          "../../../../assets/img/icons/icono_servicio-general_007.svg"
        )
      )
      .addSvgIcon(
        `servicio-general_008`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          "../../../../assets/img/icons/icono_servicio-general_008.svg"
        )
      )
      .addSvgIcon(
        `servicio-general_009`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          "../../../../assets/img/icons/icono_servicio-general_009.svg"
        )
      )
      .addSvgIcon(
        `servicio-general_010`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          "../../../../assets/img/icons/icono_servicio-general_010.svg"
        )
      );
  }

  ngOnInit() {}
}
