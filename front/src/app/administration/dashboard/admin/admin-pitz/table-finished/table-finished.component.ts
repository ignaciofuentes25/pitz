import { Component, OnInit, ViewChild } from "@angular/core";
import { DataSource } from "@angular/cdk/table";
import { MatPaginator } from "@angular/material/paginator";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { RequestService } from "src/app/features/request/services/request/request.service";

@Component({
  selector: "pitz-table-finished",
  templateUrl: "./table-finished.component.html",
  styleUrls: ["./table-finished.component.scss"],
})
export class TableFinishedComponent implements OnInit {
  displayedColumns = ["n", "service", "cliente", "date", "state"];
  exampleDatabase;
  dataSource: ExampleDataSource | null;
  public listRequest$ = new BehaviorSubject<any>(null);
  public loading$ = new BehaviorSubject<boolean>(true);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild("tableElement", { static: false }) insideElement;

  selectedRequest: any;
  selectedRequestIndex: number;
  selectedId: number = 0;

  constructor(private readonly requestService: RequestService) {}

  ngOnInit() {
    this.getRequestFiltered();
    setInterval(() => {
      this.getRequestFiltered();
    }, 300000);
  }

  getRequestFiltered() {
    this.requestService
      .getRequestFiltered("5")
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

  addRequest() {
    const copiedData = this.data.slice();
    copiedData.push(this.createNewRequest());
    this.dataChange.next(copiedData);
  }

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

export class ExampleDataSource extends DataSource<any> {
  constructor(
    private _exampleDatabase: ExampleDatabase,
    private _paginator: MatPaginator
  ) {
    super();
  }

  connect(): Observable<any[]> {
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._paginator.page,
    ];

    return merge(...displayDataChanges).pipe(
      map(() => {
        const data = this._exampleDatabase.data.slice();

        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        return data.splice(startIndex, this._paginator.pageSize);
      })
    );
  }

  disconnect() {}
}
