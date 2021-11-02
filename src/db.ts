import { createHash, randomBytes } from "crypto";
import { config } from "dotenv";
import admin from "firebase-admin";
import { IUser } from "./interfaces/user";

config();

const authKey = JSON.parse(process.env.FIREBASE!);

admin.initializeApp({ credential: admin.credential.cert(authKey) });

const db = admin.firestore();

class dbIntegration {
  async generateKey(): Promise<string> {
    const key = randomBytes(256).toString("hex");
    const hashed = await this.hashKey(key);
    return hashed;
  }

  hashKey(apiKey: string): string {
    const hashed = createHash("sha256").update(apiKey).digest("hex");
    return hashed;
  }

  async createUser(uid: string, name: string) {
    const user = db.collection("users").doc(uid);
    const userRef = await user.get();

    if (userRef.exists) {
      return "user already exist";
    } else {
      let userDefs: IUser = {
        name: name,
        key: await this.generateKey(),
        dateCreated: admin.firestore.Timestamp.now(),
      };
			console.log(userDefs);
      user.set(userDefs);
      console.log(`user with uid [${uid}] is created`);
      return "User Created";
    }
  }
}

export default dbIntegration;