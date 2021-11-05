import { Timestamp } from "firebase-admin/firestore";

export interface IUser {
  name: string;
  dateCreated: Timestamp;
  key: string;
  profURL: string;
}
