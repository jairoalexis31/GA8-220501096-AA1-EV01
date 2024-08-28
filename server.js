const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Configuración de la conexión a MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1193207526',
    database: 'inventarios'
});

// Conectar a la base de datos
db.connect(err => {
    if (err) throw err;
    console.log('Conectado a la base de datos MySQL');
});

// Endpoint para ingresar mercancía
app.post('/api/ingresar', (req, res) => {
    const { nombre, cantidad, precio } = req.body;
    const query = 'INSERT INTO productos (nombre, cantidad, precio) VALUES (?, ?, ?)';
    db.query(query, [nombre, cantidad, precio], (err, results) => {
        if (err) throw err;
        res.json({ id: results.insertId, nombre, cantidad, precio });
    });
});

// Endpoint para obtener la lista de mercancía
app.get('/api/mercancia', (req, res) => {
    db.query('SELECT * FROM productos', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Otros endpoints (modificar y solicitar) se pueden agregar de manera similar

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
