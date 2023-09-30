import databaseRouter from "./database-router.js";

export default (app) => {
  app.use("/healthz", databaseRouter);

app.use((req, res) => {
  res
    .status(405)
    .header("cache-control", "no-cache, no-store, must-revalidate")
    .header("pragma", "no-cache")
    .json();
}) 
};