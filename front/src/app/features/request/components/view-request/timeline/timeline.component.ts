import { Component, Input, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TrackingHistoryService } from "src/app/new-core/services/tracking-history/tracking-history.service";

@Component({
  selector: "pitz-timeline",
  templateUrl: "./timeline.component.html",
  styleUrls: ["./timeline.component.scss"],
})
export class TimelineComponent implements OnInit {
  @Input() requestId;
  public trackingHistory$ = new BehaviorSubject<any>(null);

  constructor(private readonly trackingService: TrackingHistoryService) {}

  ngOnInit() {
    this.getHistory();
  }

  getHistory() {
    this.trackingService
      .getTrackingHistory(this.requestId)
      .subscribe((response) => {
        this.trackingHistory$.next(response.data);
      });
  }
}
