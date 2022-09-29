import { Component, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { DashboardService } from "src/app/new-core/services/dashboard/dashboard.service";

@Component({
  selector: "pitz-admin-pitz",
  templateUrl: "./admin-pitz.component.html",
  styleUrls: ["./admin-pitz.component.scss"],
})
export class AdminPitzComponent implements OnInit {
  public listStatus$ = new BehaviorSubject<any>([]);
  public user = false;

  constructor(private readonly dashboardService: DashboardService) {}

  ngOnInit() {
    if (
      localStorage.getItem("auth") !== undefined &&
      localStorage.getItem("auth") !== null
    ) {
      if (JSON.parse(localStorage.getItem("auth")).usW_TIPO === "1") {
        this.user = true;
      }
    }

    this.dashboardService.getViewSolCount().subscribe((response) => {
      this.listStatus$.next(response.data);
    });
  }
}
