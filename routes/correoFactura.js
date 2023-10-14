const express = require('express');
const router = express.Router();
const Facturapi = require('facturapi');
const facturapi = new Facturapi('sk_test_zlaq7E1LdVog4PWbyJ4q3Aer9GNY8xDQ635JGprAw2');

 // Mostrar el formulario
router.get('/', (req, res) => {
    res.render('correoFactura'); // Renderiza el formulario.ejs
}); 

// Procesar el formulario
router.post('/', async (req, res) => {
    try {
         const { 
            facturaID,
            email
          } = req.body; 

// Enviar a otro correo
await facturapi.invoices.sendByEmail(
    facturaID,
    { email: email }
  );

        console.log("Enviado al correo");
        res.send(`Factura enviada al correo`);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error interno del servidor');
    }
});

module.exports = router;