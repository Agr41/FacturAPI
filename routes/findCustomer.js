const express = require('express');
const router = express.Router();
const Facturapi = require('facturapi');
const facturapi = new Facturapi('sk_test_zlaq7E1LdVog4PWbyJ4q3Aer9GNY8xDQ635JGprAw2');

router.get('/', async (req, res) => {
    res.render('findCustomer');
});
// Procesar el formulario
router.post('/', async (req, res) => {
    try {
        const { idCustomer } = req.body;

        // Crea un cliente
        const customer = await facturapi.customers.retrieve(idCustomer);
        // Envía una respuesta al cliente
        res.render('customer', { customer });
        console.log(customer);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error interno del servidor');
    }
});

module.exports = router;
