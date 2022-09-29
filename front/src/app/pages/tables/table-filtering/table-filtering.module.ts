import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TableFilteringComponent } from "./table-filtering.component";
import { FormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ScrollbarModule } from "../../../core/scrollbar/scrollbar.module";
import { PageHeaderModule } from "../../../shared/page-header/page-header.module";
import { BreadcrumbsModule } from "../../../shared/breadcrumbs/breadcrumbs.module";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { CdkTableModule } from "@angular/cdk/table";
import { TableFilteringRoutingModule } from "./table-filtering-routing.module";

@NgModule({
  imports: [
    CommonModule,
    TableFilteringRoutingModule,
    FormsModule,
    FlexLayoutModule,
    ScrollbarModule,
    PageHeaderModule,
    BreadcrumbsModule,
    MatTableModule,
    CdkTableModule,
    MatInputModule,
  ],
  declarations: [TableFilteringComponent],
})
export class TableFilteringModule {}
