import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ServiceComponent } from "./service.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ScrollbarModule } from "../../core/scrollbar/scrollbar.module";
import { ServiceRoutingModule } from "./service.routing";
import {
  MatCheckboxModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatProgressSpinnerModule,
  MatSelectModule,
} from "@angular/material";
import { ServiceFormComponent } from "./components/service-form/service-form.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ServiceRoutingModule,
    FormsModule,
    FlexLayoutModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ScrollbarModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDividerModule,
    MatProgressSpinnerModule,
  ],
  declarations: [ServiceComponent, ServiceFormComponent],
})
export class ServiceModule {}
