const express = require('express');
const router = express.Router();
const Facturapi = require('facturapi');
const facturapi = new Facturapi('sk_test_zlaq7E1LdVog4PWbyJ4q3Aer9GNY8xDQ635JGprAw2');

router.get('/', async (req, res) => {
    res.render('deleteCustomer');
});
// Procesar el formulario
router.post('/', async (req, res) => {
    try {
        const { idCustomer } = req.body;


        const removedCustomer = await facturapi.customers.del(idCustomer);
        
        // Envía una respuesta al cliente
        res.render('deletedCustomer', { removedCustomer });
        console.log(removedCustomer);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error interno del servidor');
    }
});

module.exports = router;
