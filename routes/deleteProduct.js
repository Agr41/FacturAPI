const express = require('express');
const router = express.Router();
const Facturapi = require('facturapi');
const facturapi = new Facturapi('sk_test_zlaq7E1LdVog4PWbyJ4q3Aer9GNY8xDQ635JGprAw2');

// Procesar el formulario
router.get('/', async (req, res) => {
    res.render('deleteProduct');
});

router.post('/', async (req, res) => {
    try {
    const { product_id } = req.body;

    const removedProduct = await facturapi.products.del(product_id);

    // Envía una respuesta al cliente
    res.send('Producto ELIMINADO');
    console.log(removedProduct);
} catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error interno del servidor');
} 
});



module.exports = router;
