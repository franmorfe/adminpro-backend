const express = require('express');
require('dotenv').config();

const cors = require('cors');
const { dbConnection } = require('./database/config');

const app = express();

// Configurar Cors
app.use(cors());

// Base de datos
dbConnection();

app.get('/', (req, res)=> {
    res.json({
      ok: true,
      msg: 'Hola Mundo!'
    });
  });


app.listen( process.env.PORT, () => {
    console.log('Servidor activo en puerto ', process.env.PORT);
});