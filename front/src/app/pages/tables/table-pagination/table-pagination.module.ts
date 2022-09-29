import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TablePaginationComponent } from "./table-pagination.component";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { FormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ScrollbarModule } from "../../../core/scrollbar/scrollbar.module";
import { PageHeaderModule } from "../../../shared/page-header/page-header.module";
import { BreadcrumbsModule } from "../../../shared/breadcrumbs/breadcrumbs.module";
import { CdkTableModule } from "@angular/cdk/table";
import { TablePaginationRoutingModule } from "./table-pagination-routing.module";

@NgModule({
  imports: [
    CommonModule,
    TablePaginationRoutingModule,
    FormsModule,
    FlexLayoutModule,
    ScrollbarModule,
    PageHeaderModule,
    BreadcrumbsModule,
    MatTableModule,
    CdkTableModule,
    MatPaginatorModule,
  ],
  declarations: [TablePaginationComponent],
})
export class TablePaginationModule {}
