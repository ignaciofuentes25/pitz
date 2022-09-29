import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ScrollbarModule } from "../../core/scrollbar/scrollbar.module";
import { DashboardRoutingModule } from "./dashboard.routing";
import {
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule,
  MatOptionModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatTableModule,
} from "@angular/material";
import { DashboardComponent } from "./dashboard.component";
import { CdkTableModule } from "@angular/cdk/table";
import { UtilsModule } from "src/app/core/utils/utils.module";

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    FlexLayoutModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
    ScrollbarModule,
    MatTableModule,
    CdkTableModule,
    MatPaginatorModule,
    MatMenuModule,
    UtilsModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  declarations: [DashboardComponent],
})
export class DashboardModule {}
