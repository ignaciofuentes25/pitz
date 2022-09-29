import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RegisterComponent } from "./register.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ScrollbarModule } from "../../core/scrollbar/scrollbar.module";
import { RegisterRoutingModule } from "./register.routing";
import {
  MatCheckboxModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatProgressSpinnerModule,
  MatSelectModule,
} from "@angular/material";
import { RegisterFormComponent } from "./components/register-form/register-form.component";
import { ValidationMessageComponent } from "./components/validation-message/validation-message.component";
import { ValidationSelectComponent } from "./components/validation-select/validation-select.component";
import { EmailFormComponent } from "./components/email-form/email-form.component";
import { EmailMessageComponent } from "./components/email-message/email-message.component";

@NgModule({
  imports: [
    CommonModule,
    RegisterRoutingModule,
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
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  declarations: [
    RegisterComponent,
    RegisterFormComponent,
    ValidationMessageComponent,
    ValidationSelectComponent,
    EmailFormComponent,
    EmailMessageComponent,
  ],
})
export class RegisterModule {}
