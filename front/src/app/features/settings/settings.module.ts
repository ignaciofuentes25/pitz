import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SettingsComponent } from "./settings.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { FormsModule } from "@angular/forms";
import { ScrollbarModule } from "../../core/scrollbar/scrollbar.module";
import { SettingsRoutingModule } from "./settings.routing";
import {
  MatCheckboxModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
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
  ],
  declarations: [SettingsComponent],
})
export class SettingsModule {}
