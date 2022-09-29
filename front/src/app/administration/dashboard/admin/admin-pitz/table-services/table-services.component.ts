import { Component, OnInit, ViewChild } from "@angular/core";
import { DataSource } from "@angular/cdk/table";
import { MatPaginator } from "@angular/material/paginator";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "pitz-table-services",
  templateUrl: "./table-services.component.html",
  styleUrls: ["./table-services.component.scss"],
})
export class TableServicesComponent implements OnInit {
  displayedColumns = [
    "id",
    "title",
    "service",
    "client",
    "pitzer",
    "date",
    "state",
    "actions",
  ];
  exampleDatabase = new ExampleDatabase();
  dataSource: ExampleDataSource | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator
    );
  }
}

/** Constants used to fill up our data base. */
const TITULOS = [
  "Titulo 1",
  "Titulo 2",
  "Titulo 3",
  "Titulo 4",
  "Titulo 5",
  "Titulo 6",
  "Titulo 7",
  "Titulo 8",
  "Titulo 9",
  "Titulo 10",
];

const SERVICIOS = [
  "Mantención multimarca por Kilometraje.",
  "Preparación para revisión técnica.",
  "Mantención de Frenos.",
  "Compra de accesorios y repuestos.",
  "Revisión y cambio de Neumáticos.",
  "Reparación de parabrisas.",
  "Revisión Pre Compra.",
  "Lavado ecológico a domicilio.",
  "Limpieza y detallado de autos.",
  "Servicio de Grúa.",
];

const ESTADOS = [
  "Atendida",
  "En Progreso",
  "Cerrada",
  "Atendida",
  "Atendida",
  "En Progreso",
  "Atendida",
  "Cerrada",
  "En Progreso",
  "Atendida",
];

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor() {
    // Fill up the database with 100 users.
    for (let i = 0; i < 100; i++) {
      this.addUser();
    }
  }

  get data(): any[] {
    return this.dataChange.value;
  }

  /** Adds a new user to the database. */
  addUser() {
    const copiedData = this.data.slice();
    copiedData.push(this.createNewUser());
    this.dataChange.next(copiedData);
  }

  /** Builds and returns a new User. */
  private createNewUser() {
    return {
      id: (this.data.length + 1).toString(),
      title: TITULOS,
      service: SERVICIOS,
      date: new Date(),
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
