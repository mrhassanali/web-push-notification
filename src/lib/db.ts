import Datastore from "nedb";
import path from "path";

// Initialize NeDB
const db = new Datastore({
  filename: path.join(process.cwd(), "subscriptions.db"),
  autoload: true,
});

// Create unique index on endpoint
db.ensureIndex({ fieldName: "endpoint", unique: true }, (err) => {
  if (err) console.error("Index creation error:", err);
});

export { db };
