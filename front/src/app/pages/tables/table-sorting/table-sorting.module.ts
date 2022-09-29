import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TableSortingComponent } from "./table-sorting.component";
import { FormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ScrollbarModule } from "../../../core/scrollbar/scrollbar.module";
import { PageHeaderModule } from "../../../shared/page-header/page-header.module";
import { BreadcrumbsModule } from "../../../shared/breadcrumbs/breadcrumbs.module";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { CdkTableModule } from "@angular/cdk/table";
import { TableSortingRoutingModule } from "./table-sorting-routing.module";

@NgModule({
  imports: [
    CommonModule,
    TableSortingRoutingModule,
    FormsModule,
    FlexLayoutModule,
    ScrollbarModule,
    PageHeaderModule,
    BreadcrumbsModule,
    MatTableModule,
    CdkTableModule,
    MatSortModule,
    MatCheckboxModule,
  ],
  declarations: [TableSortingComponent],
})
export class TableSortingModule {}
