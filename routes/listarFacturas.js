const express = require('express');
const router = express.Router();
const Facturapi = require('facturapi');
const facturapi = new Facturapi('sk_test_zlaq7E1LdVog4PWbyJ4q3Aer9GNY8xDQ635JGprAw2');

/* // Mostrar el formulario
router.get('/', (req, res) => {
    res.render('crearFactura'); // Renderiza el formulario.ejs
}); */

// Procesar el formulario
router.get('/', async (req, res) => {
    try {

// Todas las facturas de la organización
const invoiceSearch = await facturapi.invoices.list();

        console.log(invoiceSearch);
        res.render('verFacturas', { invoiceSearch });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error interno del servidor');
    }
});

module.exports = router;