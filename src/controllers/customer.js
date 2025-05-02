import pool from "../db.js";

export const getCustomers = async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT id, nama, email, telepon, tanggal_registrasi FROM pelanggan ORDER BY id ASC"
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
};

export const getCustomerById = async (req, res, next) => {
  const id = parseInt(req.params.id);
  try {
    const result = await pool.query(
      "SELECT id, nama, email, telepon, tanggal_registrasi FROM pelanggan WHERE id = $1",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Pelanggan tidak ditemukan" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const createCustomer = async (req, res, next) => {
  const { nama, telepon, email, tanggal_registrasi } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO pelanggan (nama, telepon, email, tanggal_registrasi) VALUES ($1, $2, $3, $4) RETURNING *",
      [nama, telepon, email, tanggal_registrasi]
    );
    res.status(201).json({ message: "Pelanggan berhasil dibuat", data: result.rows[0] });
  } catch (error) {
    next(error);
  }
};

export const updateCustomer = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const { nama, email, telepon, tanggal_registrasi } = req.body;
  try {
    const result = await pool.query(
      "UPDATE pelanggan SET nama = $1, email = $2, telepon = $3, tanggal_registrasi = $4 WHERE id = $5 RETURNING *",
      [nama, email, telepon, tanggal_registrasi, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Pelanggan tidak ditemukan" });
    }
    res.status(200).json({ message: "Pelanggan berhasil diperbarui", data: result.rows[0] });
  } catch (error) {
    next(error);
  }
};

export const deleteCustomer = async (req, res, next) => {
  const id = parseInt(req.params.id);
  try {
    const result = await pool.query(
      "DELETE FROM pelanggan WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Pelanggan tidak ditemukan" });
    }
    res.status(200).json({ message: "Pelanggan berhasil dihapus", data: result.rows[0] });
  } catch (error) {
    next(error);
  }
};
