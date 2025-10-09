import { db } from "../index.js";

import { addUser, addContact, findUserByEmail } from "../db/models/user.js";

import { addMessage } from "../db/models/message.js";

export async function main() {
  try {
    for (let i = 4; i < 10; i++) {
      const userData = {
        email: `example${i}@email.com`,
        password: "examplePassword",
        name: `Example Name${i}`,
        avatarUrl: "http://example.com/avatar.png",
        contacts: []
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


}
