import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ScrollbarComponent } from "../../../../../core/scrollbar/scrollbar.component";
import { ROUTE_TRANSITION } from "../../../../../app.animation";
import * as moment from "moment";
import sortBy from "lodash-es/sortBy";
import Scrollbar from "smooth-scrollbar";
import { MediaObserver } from "@angular/flex-layout";
import { componentDestroyed } from "../../../../../core/utils/component-destroyed";
import { takeUntil } from "rxjs/operators";
import { RequestService } from "../../../services/request/request.service";
import { ChatModel, Messages } from "../../../models/chat.interface";
import { DatePipe } from "@angular/common";
import { BehaviorSubject } from "rxjs";
import { ChatRequest } from "../../../models/request/chat-request.interface";
import { DocumentService } from "src/app/new-core/services/document/document.service";
import { SnackBarService } from "src/app/new-core/services/snack-bar/snack-bar.service";

const userPicture = "assets/img/demo/avatars/noavatar.png";
const pitzetPicture = "assets/img/logo-responsive.png";

@Component({
  selector: "pitz-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
  animations: [...ROUTE_TRANSITION],
  host: { "[@routeTransition]": "" },
})
export class ChatComponent implements OnInit, OnDestroy {
  @Input() requestId;
  @Input() isUser;
  @Input() isWebUser;
  scrollbar: Scrollbar;

  user = true;

  drawerOpen = true;
  drawerMode = "side";
  drawerDisableClose = true;

  public sendState$ = new BehaviorSubject<boolean>(false);
  public chats$ = new BehaviorSubject<any[]>(null);
  public documents$ = new BehaviorSubject<any>([]);

  activeChat: any;
  newMessage: string;

  public messageList: Messages[] = [];

  @ViewChild("scroll", { read: ElementRef, static: true })
  scrollElement: ElementRef;
  @ViewChild("scroll", { static: true }) scroll: ScrollbarComponent;

  constructor(
    //private cd: ChangeDetectorRef,
    private mediaObserver: MediaObserver,
    private readonly requestService: RequestService,
    private readonly documentService: DocumentService,
    private readonly snackBarService: SnackBarService
  ) {}

  ngOnInit() {
    this.getChatInfo();

    this.mediaObserver
      .asObservable()
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe(() => {
        const isMobile =
          this.mediaObserver.isActive("xs") ||
          this.mediaObserver.isActive("sm");

        if (isMobile) {
          this.drawerOpen = false;
          this.drawerMode = "over";
          this.drawerDisableClose = false;
        } else {
          this.drawerOpen = true;
          this.drawerMode = "side";
          this.drawerDisableClose = true;
        }
      });

    setInterval(() => {
      this.getChatInfo();
    }, 15000);

    this.documentService.getDocuments(this.requestId).subscribe((response) => {
      if (response.success) {
        let documentList: any = [];
        response.data.forEach((doc) => {
          const document: any = {
            doc_id: doc.doC_ID,
            doc_nombre: doc.doC_NOMBRE,
            doc_file: doc.doC_FILE,
            doc_tipo_usuario: doc.doC_TIPO_USUARIO,
            sol_id: doc.soL_ID,
          };
          documentList.push(document);
        });

        this.documents$.next([...this.documents$.getValue(), ...documentList]);
      }
    });
  }

  getChatInfo() {
    this.messageList = [];
    this.requestService.getChat(this.requestId).subscribe((response) => {
      response.data.forEach((m) => {
        var datePipe = new DatePipe("en-US");
        const newDate = datePipe.transform(m.chaT_FECHA_ENVIO, "h:mm a");
        let message: Messages = {
          message: m.chaT_MENSAJE,
          when: moment().subtract(34, "minutes"),
          who: m.chaT_USUARIO === 1 ? "partner" : "me",
          date: newDate,
          picture: m.chaT_USUARIO === 1 ? userPicture : pitzetPicture,
          document: m.chaT_DOCUMENTO,
        };

        this.messageList.push(message);
      });

      let chatData: ChatModel[] = [
        {
          messages: this.messageList,
          lastMessageTime: moment().subtract(170, "minutes"),
        },
      ];

      this.chats$.next(this.messageList);
      this.activeChat = sortBy(chatData, "lastMessageTime").reverse()[0];
    });
  }

  setActiveChat(chat) {
    this.activeChat = chat;
  }

  send() {
    this.sendState$.next(true);
    if (this.newMessage !== "") {
      let chat: ChatRequest = {
        sol_id: this.requestId,
        chat_mensaje: this.newMessage,
        chat_usuario: this.isUser === true ? 1 : 0,
        chat_usuario_web: this.isWebUser === true ? 1 : 0,
        chat_documento: 0,
      };

      this.requestService.postChatMessage(chat).subscribe(
        (response) => {
          if (response.data) {
            var datePipe = new DatePipe("en-US");
            const newDate = datePipe.transform(new Date(), "h:mm a");

            let message: Messages = {
              message: this.newMessage,
              when: moment().subtract(34, "minutes"),
              who: this.isUser ? "partner" : "me",
              date: newDate,
              picture: this.isUser ? userPicture : pitzetPicture,
              document: 0,
            };

            this.messageList.push(message);
            this.chats$.next(this.messageList);
            this.newMessage = "";
          }
          this.sendState$.next(false);
        },
        () => {
          this.sendState$.next(false);
        }
      );
    }
  }

  sendDocument(id) {
    this.sendState$.next(true);
    let chat: ChatRequest = {
      sol_id: this.requestId,
      chat_mensaje: "",
      chat_usuario: this.isUser === true ? 1 : 0,
      chat_usuario_web: this.isWebUser === true ? 1 : 0,
      chat_documento: id,
    };

    this.requestService.postChatMessage(chat).subscribe(
      (response) => {
        if (response.data) {
          var datePipe = new DatePipe("en-US");
          const newDate = datePipe.transform(new Date(), "h:mm a");

          let message: Messages = {
            message: this.newMessage,
            when: moment().subtract(34, "minutes"),
            who: this.isUser ? "partner" : "me",
            date: newDate,
            picture: this.isUser ? userPicture : pitzetPicture,
            document: id,
          };

          this.messageList.push(message);
          this.chats$.next(this.messageList);
          this.newMessage = "";
        }
        this.sendState$.next(false);
      },
      () => {
        this.sendState$.next(false);
      }
    );
  }

  clearMessages(activeChat) {
    activeChat.messages.length = 0;
  }

  scrollToBottom() {
    setTimeout(() => {
      this.scroll.scrollbar.scrollTo(
        0,
        this.scroll.scrollbar.getSize().content.height,
        200
      );
    }, 100);
  }

  ngOnDestroy() {}

  donwloadDocumentFunction(doc) {
    this.documentService.getDocumentById(doc.document).subscribe((response) => {
      if (response.success) {
        const blob = this.convertBase64ToBlob(response.data[0].doC_FILE);
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      } else {
        this.snackBarService.snackBarError("Error al descargar el documento.");
      }
    });
  }

  private convertBase64ToBlob(base64Image: string) {
    const parts = base64Image.split(";base64,");
    const imageType = parts[0].split(":")[1];
    const decodedData = window.atob(parts[1]);
    const uInt8Array = new Uint8Array(decodedData.length);
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: imageType });
  }

  onChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const document: any = {
        doc_nombre: event.target.files[0].name,
        doc_file: reader.result,
        doc_tipo_usuario: this.isUser ? 1 : 2,
        sol_id: this.requestId,
      };
      this.documentService.postDocument(document).subscribe((response) => {
        if (response.success) {
          this.snackBarService.snackBarSuccess(
            "Documento subido correctamente."
          );
          document.doc_id = response.id;
          this.documents$.next([...this.documents$.getValue(), ...[document]]);
          this.sendDocument(response.id);
        } else {
          this.snackBarService.snackBarError("Error al subir el documento.");
        }
      });
    };
  }

  // removeDocumentFunction(doc) {
  //   this.documentService.removeDocument(doc.doc_id).subscribe((response) => {
  //     if (response.success) {
  //       this.snackBarService.snackBarSuccess(
  //         "Documento eliminado correctamente."
  //       );
  //       let listDocuments: any = [];
  //       this.documents$.value.forEach((document) => {
  //         if (document.doc_id !== doc.doc_id) {
  //           listDocuments.push(document);
  //         }
  //       });
  //       this.documents$.next(listDocuments);
  //     } else {
  //       this.snackBarService.snackBarError("Error al eliminar el documento.");
  //     }
  //   });
  // }
}
