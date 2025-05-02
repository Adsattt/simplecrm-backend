import express from "express";
import cors from "cors";
import helmet from "helmet";
import customerRoutes from "./src/routes/customer.js";

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/customers", customerRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  console.log(`Database URL: ${process.env.PGHOST}`);
});
export default app;
