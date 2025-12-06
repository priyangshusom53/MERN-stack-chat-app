
import { AddContactAction } from "./addContact.js"
export interface AddContactActionFactory {
   create(): AddContactAction;
}

import { UserRepo } from "../../../db/repos/userRepo.js";
import type { DataBase } from "../../../db/repos/dbInterface.js";
class Factory implements AddContactActionFactory {
   db: DataBase
   constructor(db: DataBase) { this.db = db }
   create(): AddContactAction {
      const userRepo = new UserRepo(this.db)
      const addContactAction = new AddContactAction(userRepo)
      return addContactAction
   }
}