import express from "express";
import cors from "cors";
import helmet from "helmet";
import customerRoutes from "./src/routes/customer.js";
import pool from "./src/db.js";

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

async function verifyDbConnection() {
  try {
    const { rows } = await pool.query("SELECT NOW()");
    console.log("✅ Database connected, time:", rows[0].now);
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1); // hentikan app kalau gagal connect
  }
}

const PORT = process.env.PORT || 3000;
verifyDbConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Using DATABASE_URL: ${process.env.DATABASE_URL}`);
  });
});
export default app;
