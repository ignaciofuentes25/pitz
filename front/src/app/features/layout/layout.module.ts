import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LayoutComponent } from "./layout.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatRippleModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { SidenavModule } from "../../shared/sidenav/sidenav.module";
import { ToolbarModule } from "../../shared/toolbar/toolbar.module";
import { QuickpanelModule } from "../../core/quickpanel/quickpanel.module";
import { RouterModule } from "@angular/router";
import { ScrollbarService } from "../../core/scrollbar/scrollbar.service";
import { SettingsModule } from "../../core/settings/settings.module";
import { FooterModule } from "../../shared/footer/footer.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MatSidenavModule,
    SidenavModule,
    SettingsModule,
    ToolbarModule,
    QuickpanelModule,
    MatIconModule,
    MatRippleModule,
    MatButtonModule,
    FooterModule,
  ],
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
  providers: [ScrollbarService],
})
export class LayoutModule {}
