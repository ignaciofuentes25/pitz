export interface ChatModel {
  messages: Messages[];
  lastMessageTime: any;
}

export interface Messages {
  message: string;
  when: any;
  who: string;
  date: string;
  picture: string;
  document: number;
}
