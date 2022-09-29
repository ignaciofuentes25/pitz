import { Component, OnInit, ViewChild } from "@angular/core";
import { DataSource } from "@angular/cdk/table";
import { MatPaginator } from "@angular/material/paginator";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { UserWebService } from "src/app/new-core/services/web-user/web-user.service";

@Component({
  selector: "pitz-table-pitzer",
  templateUrl: "./table-pitzer.component.html",
  styleUrls: ["./table-pitzer.component.scss"],
})
export class TablePitzerComponent implements OnInit {
  displayedColumns = ["n", "name", "email", "actions"];
  exampleDatabase;
  dataSource: ExampleDataSource | null;
  public listRequest$ = new BehaviorSubject<any>(null);
  public loading$ = new BehaviorSubject<boolean>(true);

  selectedUserWeb: any;
  selectedUserWebIndex: number;

  selectedUserWebId: number = 0;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private readonly userWebService: UserWebService) {}

  ngOnInit() {
    this.userWebService
      .getWebUser()
      .toPromise()
      .then((response) => {
        this.listRequest$.next(response.data);

        this.listRequest$.subscribe((response) => {
          if (response != null) {
            this.exampleDatabase = new ExampleDatabase(response);

            this.refresh();
            document.getElementById("tableClick").click();
          }
        });
      });
  }

  refresh() {
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator
    );
  }

  saveRowFunction(row, index) {
    this.selectedUserWeb = row.object[index];
    this.selectedUserWebId = row.object[index].usW_ID;
    this.selectedUserWebIndex = index;
  }
}

const OBJECT = [];
const NOMBRES = [];
const EMAIL = [];

export class ExampleDatabase {
  dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(dataResponse: any) {
    dataResponse.forEach((request) => {
      OBJECT.push(request);
      NOMBRES.push(request.usW_NOMBRE);
      EMAIL.push(request.usW_EMAIL);
      this.addUser();
    });
  }

  get data(): any[] {
    return this.dataChange.value;
  }

  addUser() {
    const copiedData = this.data.slice();
    copiedData.push(this.createNewUser());
    this.dataChange.next(copiedData);
  }

  private createNewUser() {
    return {
      object: OBJECT,
      n: (this.data.length + 1).toString(),
      name: NOMBRES,
      email: EMAIL,
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
