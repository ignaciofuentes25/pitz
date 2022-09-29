import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginModule } from "./login/login.module";
import { ForgotPasswordModule } from "./forgot-password/forgot-password.module";
import { LayoutComponent } from "../layout/layout.component";
import { ToolbarModule } from "src/app/shared/toolbar/toolbar.module";
import { RouterModule } from "@angular/router";
import { FooterModule } from "src/app/shared/footer/footer.module";
import { MatSidenavModule } from "@angular/material/sidenav";
import {
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
} from "@angular/material";
import { ScrollbarModule } from "src/app/core/scrollbar/scrollbar.module";
import { FormsModule } from "@angular/forms";
import { RequestModule } from "src/app/features/request/request.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LoginModule,
    ForgotPasswordModule,
    ToolbarModule,
    FooterModule,
    MatSidenavModule,
    MatDividerModule,
    MatIconModule,
    ScrollbarModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    RequestModule,
  ],
  declarations: [LayoutComponent],
})
export class AuthModule {}
