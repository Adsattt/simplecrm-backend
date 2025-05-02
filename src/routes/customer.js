import { Router } from "express";
import {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customer.js";
import { validateCustomer } from "../middleware/validate.js";


const router = Router();


router.get("/", getCustomers);
router.get("/:id", getCustomerById);
router.post("/", validateCustomer, createCustomer);
router.put("/:id", validateCustomer, updateCustomer);
router.delete("/:id",  deleteCustomer);

export default router;