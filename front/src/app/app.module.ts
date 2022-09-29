import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { environment } from "../environments/environment";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PagesModule } from "./pages/pages.module";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { reducers } from "./reducers";
import { EffectsModule } from "@ngrx/effects";
import { AgmCoreModule } from "@agm/core";
import { RouteHandlerModule } from "./shared/route-handler/route-handler.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { SharedModule } from "./shared/shared.module";
import { JwtInterceptorInterceptor } from "./new-core/interceptors/jwt-interceptor.interceptor";
import { MatSnackBarModule } from "@angular/material";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: "elastic-ui" }),
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    !environment.production
      ? StoreDevtoolsModule.instrument({ maxAge: 50 })
      : [],
    EffectsModule.forRoot([]),
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsApiKey,
    }),
    AppRoutingModule,
    CoreModule,
    PagesModule,
    SharedModule,
    RouteHandlerModule,
    MatSnackBarModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorInterceptor,
      multi: true,
    },
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
