import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { FormsModule } from "@angular/forms";
import { ScrollbarModule } from "../../core/scrollbar/scrollbar.module";
import { HomeRoutingModule } from "./home.routing";
import { HomeServicesComponent } from "./components/home-services/home-services.component";
import { HomeTabComponent } from "./components/home-tab/home-tab.component";
import { PageHeaderComponent } from "src/app/shared/page-header/page-header.component";
import { HomeTitleComponent } from "./components/home-tab/home-title/home-title.component";
import { MatOptionModule, MatSelectModule } from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    FlexLayoutModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
    ScrollbarModule,
  ],
  declarations: [
    HomeComponent,
    HomeServicesComponent,
    HomeTabComponent,
    PageHeaderComponent,
    HomeTitleComponent,
  ],
})
export class HomeModule {}
