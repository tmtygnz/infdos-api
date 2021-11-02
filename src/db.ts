import { createHash, randomBytes } from "crypto";
import { config } from "dotenv";
import admin from "firebase-admin";
import { ReasonPhrases } from "http-status-codes";
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

  async createUser(uid: string, name: string): Promise<ReasonPhrases> {
    const user = db.collection("users").doc(uid);
    const userRef = await user.get();

    if (userRef.exists) {
      return ReasonPhrases.CONFLICT;
    } else {
      try {
        let userDefs: IUser = {
          name: name,
          key: await this.generateKey(),
          dateCreated: admin.firestore.Timestamp.now(),
        };
        console.log(userDefs);
        user.set(userDefs);
        console.log(`user with uid [${uid}] is created`);
      } catch {
        return ReasonPhrases.INTERNAL_SERVER_ERROR;
      }
      return ReasonPhrases.OK;
    }
  }
}

export default dbIntegration;
