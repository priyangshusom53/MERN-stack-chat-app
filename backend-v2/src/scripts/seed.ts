// scripts/seed.js
import { main } from "./addData.js";

// Call main and handle exit
main()
   .then(() => {
      console.log("✅ Seeding finished!");
      process.exit(0);
   })
   .catch((err) => {
      console.error("❌ Seeding failed:", err);
      process.exit(1);
   });
