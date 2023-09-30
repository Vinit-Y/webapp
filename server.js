import app from "./api/app.js";

const port = process.env.port || 5000;

app.listen(port, () => {
  console.log(`Server running at ${port}.`);
});