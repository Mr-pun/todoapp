import { app } from "./app.js";
import { connectDB } from "./data/database.js";

connectDB();

app.listen(process.env.PORT, () => {
  console.log(
    `Server is working on port: ${process.env.PORT} IN ${process.env.NODE_ENV} MODE`
  );
});
