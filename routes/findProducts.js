const express = require('express');
const router = express.Router();
const Facturapi = require('facturapi');
const facturapi = new Facturapi('sk_test_zlaq7E1LdVog4PWbyJ4q3Aer9GNY8xDQ635JGprAw2');

// Procesar el formulario
router.get('/', async (req, res) => {
    res.render('findProducts');
});

router.post('/', async (req, res) => {
        try {
        const { q,
                page,
                limit
                } = req.body;

                const searchResult = await facturapi.products.list({
                  q: q,
                  page: page,
                  limit: limit
                });
        // Envía una respuesta al cliente
        console.log(searchResult);
        res.render('renderProducts', { searchResult });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error interno del servidor');
    } 
});


module.exports = router;
