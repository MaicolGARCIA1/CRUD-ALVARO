// products.js
const express = require('express');
const router = express.Router();
const db = require('./DB/database')


// Obtener todos los productos
router.get('/', (req, res) => {
  db.query('SELECT * FROM productos', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// Crear un nuevo producto
router.post('/', (req, res) => {
  const { nombre, precio } = req.body;
  db.query('INSERT INTO productos (nombre, precio) VALUES (?, ?)', [nombre, precio], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Producto creado exitosamente', id: result.insertId });
  });
});

// Actualizar un producto existente
router.put('/:id', (req, res) => {
  const { nombre, precio } = req.body;
  const productId = req.params.id;
  db.query('UPDATE productos SET nombre = ?, precio = ? WHERE id = ?', [nombre, precio, productId], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Producto actualizado exitosamente', rowsAffected: result.affectedRows });
  });
});

// Eliminar un producto
router.delete('/:id', (req, res) => {
  const productId = req.params.id;
  db.query('DELETE FROM productos WHERE id = ?', [productId], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Producto eliminado exitosamente', rowsAffected: result.affectedRows });
  });
});

module.exports = router;
