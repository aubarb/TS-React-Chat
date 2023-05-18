import { FieldValue } from "firebase/firestore";

export interface IMessage {
  senderId: string;
  avatar: string;
  createdAt: any;
  text: string;
  name: string;
  uid: string;
  id: string;
}

export interface IUser {
  displayName: string;
  photoURL: string;
  createdAt: FieldValue;
  uid: string;
}

export interface IChat {
  user1: IUser;
  user2: IUser;
  createdAt: any;
  messages: IMessage[];
  id: string;
}

/* 
avatar: "https://lh3.googleusercontent.com/a/AGNmyxZn16VL-gVFcmieAqVssjJXJR265a8wYyP1y6np4w=s96-c"
createdAt: nt {seconds: 1681214196, nanoseconds: 996000000}
name: "Ori"
text: "ttt"
uid: "D1F7jsoHZ8WvnnbdvWhC4Nin6GG3" 
id: "gJpdMaWthDL0ir7PmGGo"
*/
