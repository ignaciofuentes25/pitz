import { Component, OnInit, ViewChild } from "@angular/core";
import { DataSource } from "@angular/cdk/table";
import { MatPaginator } from "@angular/material/paginator";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { RequestService } from "src/app/features/request/services/request/request.service";
import { SnackBarService } from "src/app/new-core/services/snack-bar/snack-bar.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "pitz-table-received",
  templateUrl: "./table-received.component.html",
  styleUrls: ["./table-received.component.scss"],
})
export class TableReceivedComponent implements OnInit {
  displayedColumns = ["n", "service", "date", "state", "actions"];
  exampleDatabase;
  dataSource: ExampleDataSource | null;
  public listRequest$ = new BehaviorSubject<any>(null);
  public loading$ = new BehaviorSubject<boolean>(true);

  selectedRequest: any;
  selectedRequestIndex: number;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild("tableElement", { static: false }) insideElement;

  constructor(
    private readonly requestService: RequestService,
    private readonly snackBarService: SnackBarService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getRequestFiltered();
    setInterval(() => {
      this.getRequestFiltered();
    }, 300000);
  }

  getRequestFiltered() {
    this.requestService
      .getRequestFiltered("1")
      .toPromise()
      .then((response) => {
        this.listRequest$.next(response.data);
      });

    this.listRequest$.subscribe((response) => {
      if (response != null) {
        this.loading$.next(false);

        this.exampleDatabase = new ExampleDatabase(response);

        this.dataSource = new ExampleDataSource(
          this.exampleDatabase,
          this.paginator
        );

        this.insideElement.nativeElement.click();
      }
    });
  }

  functionClickTest() {
    console.log("TESTING EVENT");
  }

  saveRowFunction(row, index) {
    this.selectedRequest = row.object[index];
    this.selectedRequestIndex = index;
  }

  attendFunction() {
    this.requestService
      .postAttendRequest(this.selectedRequest.soL_ID)
      .toPromise()
      .then((response) => {
        if (response.data) {
          this.snackBarService.snackBarSuccess(
            "Se ha atendido la solicitud correctamente."
          );
          this.exampleDatabase.data.splice(this.selectedRequestIndex, 1);
          this.dataSource = new ExampleDataSource(
            this.exampleDatabase,
            this.paginator
          );

          this.router.navigate([`${this.selectedRequest.soL_ID}/view/`], {
            relativeTo: this.activatedRoute,
          });
        } else {
          this.snackBarService.snackBarSuccess(
            "Error al atender la solicitud."
          );
        }
      });
  }
}

const OBJECT = [];
const SERVICIOS = [];
const ESTADOS = [];
const FECHAS = [];

export class ExampleDatabase {
  dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(dataResponse: any) {
    dataResponse.forEach((request) => {
      OBJECT.push(request);
      SERVICIOS.push(request.fK_SER_ID.seR_NOMBRE);
      ESTADOS.push(request.soL_ESTADO);
      FECHAS.push(request.soL_FECHA_CREACION);
      this.addRequest();
    });
  }

  get data(): any[] {
    return this.dataChange.value;
  }

  /** Adds a new user to the database. */
  addRequest() {
    const copiedData = this.data.slice();
    copiedData.push(this.createNewRequest());
    this.dataChange.next(copiedData);
  }

  /** Builds and returns a new User. */
  private createNewRequest() {
    return {
      object: OBJECT,
      n: (this.data.length + 1).toString(),
      service: SERVICIOS,
      date: FECHAS,
      state: ESTADOS,
    };
  }
}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class ExampleDataSource extends DataSource<any> {
  constructor(
    private _exampleDatabase: ExampleDatabase,
    private _paginator: MatPaginator
  ) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<any[]> {
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._paginator.page,
    ];

    return merge(...displayDataChanges).pipe(
      map(() => {
        const data = this._exampleDatabase.data.slice();

        // Grab the page's slice of data.
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        return data.splice(startIndex, this._paginator.pageSize);
      })
    );
  }

  disconnect() {}
}
