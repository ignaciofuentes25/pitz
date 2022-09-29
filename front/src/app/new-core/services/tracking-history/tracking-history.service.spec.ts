import { TestBed } from "@angular/core/testing";

import { TrackingHistoryService } from "./tracking-history.service";

describe("TrackingHistoryService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: TrackingHistoryService = TestBed.get(TrackingHistoryService);
    expect(service).toBeTruthy();
  });
});
