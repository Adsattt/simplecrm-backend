import { z } from "zod";

export const validateCustomer = (req, res, next) => {
  const customerSchema = z.object({
    id: z.number().int().optional(),
    nama: z.string().min(3),
    telepon: z.string().min(1).max(15),
    email: z.string().email(),
    tanggal_registrasi: z.string().refine((date) => {
      const parsedDate = new Date(date);
      return !isNaN(parsedDate.getTime());
    }, "Invalid date format"),
  });

  try {
    customerSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: error.errors || error.message });
  }
};
