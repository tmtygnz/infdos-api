import { Timestamp } from "firebase-admin/firestore";

export interface IUser {
  name: string;
  dateCreated: Timestamp;
  sessionsDone: [],
  key: string;
}
