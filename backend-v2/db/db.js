

export class DBConn {
   isConnected = false;
   connectionString = null;
   constructor(connectionString) {
      this.isConnected = false;
      this.connectionString = connectionString;
   }
}

import { connect } from "./connectdb.js";
DBConn.prototype.connect = connect;
