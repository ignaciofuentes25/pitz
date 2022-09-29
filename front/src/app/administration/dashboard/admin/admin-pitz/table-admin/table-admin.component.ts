import { Component, OnInit, ViewChild } from "@angular/core";
import { DataSource } from "@angular/cdk/table";
import { MatPaginator } from "@angular/material/paginator";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { RequestService } from "src/app/features/request/services/request/request.service";

@Component({
  selector: "pitz-table-admin",
  templateUrl: "./table-admin.component.html",
  styleUrls: ["./table-admin.component.scss"],
})
export class TableAdminComponent implements OnInit {
  displayedColumns = ["n", "service", "cliente", "date", "state", "actions"];
  exampleDatabase;
  dataSource: ExampleDataSource | null;
  public listRequest$ = new BehaviorSubject<any>([]);
  public loading$ = new BehaviorSubject<boolean>(true);
  @ViewChild("tableElement", { static: false }) insideElement;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  selectedRequest: any;
  selectedRequestIndex: number;
  selectedId: number = 0;

  constructor(private readonly requestService: RequestService) {}

  ngOnInit() {
    this.getRequestFiltered();
    setInterval(() => {
      this.listRequest$.next([]);
      this.getRequestFiltered();
    }, 300000);
  }

  getRequestFiltered() {
    this.requestService
      .getRequestFiltered("1")
      .toPromise()
      .then((response) => {
        this.listRequest$.next([...this.listRequest$.value, ...response.data]);
      });
    this.requestService
      .getRequestFiltered("2")
      .toPromise()
      .then((response) => {
        this.listRequest$.next([...this.listRequest$.value, ...response.data]);
      });

    this.requestService
      .getRequestFiltered("3")
      .toPromise()
      .then((response) => {
        this.listRequest$.next([...this.listRequest$.value, ...response.data]);
      });

    this.requestService
      .getRequestFiltered("4")
      .toPromise()
      .then((response) => {
        this.listRequest$.next([...this.listRequest$.value, ...response.data]);
      });

    this.requestService
      .getRequestFiltered("5")
      .toPromise()
      .then((response) => {
        this.listRequest$.next([...this.listRequest$.value, ...response.data]);
      })
      .finally(() => {
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
      });
  }

  saveRowFunction(row, index) {
    this.selectedRequest = row.object[index];
    this.selectedId = row.object[index].soL_ID;
    this.selectedRequestIndex = index;
  }
}

const OBJECT = [];
const SERVICIOS = [];
const CLIENTES = [];
const ESTADOS = [];
const FECHAS = [];

export class ExampleDatabase {
  dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(dataResponse: any) {
    dataResponse.forEach((request) => {
      OBJECT.push(request);
      SERVICIOS.push(request.fK_SER_ID.seR_NOMBRE);
      CLIENTES.push(request.fK_USU_ID.usU_NOMBRE);
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
      clients: CLIENTES,
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
