import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RequestComponent } from "./request.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ScrollbarModule } from "../../core/scrollbar/scrollbar.module";
import { RequestRoutingModule } from "./request.routing";
import {
  MatCheckboxModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatSidenavModule,
  MatTooltipModule,
} from "@angular/material";
import { RequestViewComponent } from "./components/view-request/request-view.component";
import { ListRequestComponent } from "./components/list-request/list-request.component";
import { ChatComponent } from "./components/view-request/chat/chat.component";
import { TimelineComponent } from "./components/view-request/timeline/timeline.component";

@NgModule({
  imports: [
    CommonModule,
    RequestRoutingModule,
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
    MatSidenavModule,
    ReactiveFormsModule,
    MatTooltipModule,
  ],
  declarations: [
    RequestComponent,
    RequestViewComponent,
    ListRequestComponent,
    ChatComponent,
    TimelineComponent,
  ],
})
export class RequestModule {}
