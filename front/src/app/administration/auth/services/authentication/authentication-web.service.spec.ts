import { TestBed } from "@angular/core/testing";

import { AuthenticationWebService } from "./authentication-web.service";

describe("AuthenticationServiceAuthenticationService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: AuthenticationWebService = TestBed.get(
      AuthenticationWebService
    );
    expect(service).toBeTruthy();
  });
});
