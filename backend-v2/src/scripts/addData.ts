
import { DB } from "../db/db.js";

import { setModel as setUserModel, userSchema } from "../db/models/user.js";
import { messageSchema, setModel as setMessageModel } from "../db/models/message.js";

import { addUser, addContact, findUserByEmail } from "../db/models/user.js";

import { addMessage } from "../db/models/message.js";

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export async function main() {
  const db = new DB(process.env.MONGODB_CONNECTION_STRING, "chat-app");

  // 1️⃣ Connect to MongoDB
  await db.connect();
  await db.useDB();

  // 2️⃣ Get collections
  // const User = db.createCollection("User", userSchema, "Users");
  // const Message = db.createCollection("Message", messageSchema, "Messages");

  // if (!User || !Message) {
  //   console.error("Collections not created");
  //   return;
  // }
  setUserModel(db)
  setMessageModel(db)
  try {
    for (let i = 4; i < 10; i++) {
      const userData = {
        email: `example${i}@email.com`,
        password: "examplePassword",
        name: `Example Name${i}`,
        avatarUrl: "http://example.com/avatar.png",
      }
      const res = await addUser(db, userData)
    }

    // add to contacts of
    const user = await findUserByEmail(db, 'example4@email.com')
    for (let i = 5; i < 10; i++) {
      const contact = await findUserByEmail(db, `example${i}@email.com`)
      const res = await addContact(db, user._id, contact._id)
    }

    // add messages between users
    for (let i = 1; i <= 16; i++) {
      for (let j = 5; j < 10; j++) {
        const contact = await findUserByEmail(db, `example${j}@email.com`)
        const sending = await addMessage(db, {
          senderId: user._id,
          receiverId: contact._id,
          content: `message ${i} from ${user.name} to ${contact.name}`
        })
        const receiving = await addMessage(db, {
          senderId: contact._id,
          receiverId: user._id,
          content: `message ${i} from ${contact.name} to ${user.name}`
        })
      }
    }


  } catch (err) {
    console.log(err.message)
  }
  await db.connection?.close();

}
