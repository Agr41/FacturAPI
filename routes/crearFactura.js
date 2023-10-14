const express = require('express');
const router = express.Router();
const Facturapi = require('facturapi');
const facturapi = new Facturapi('sk_test_zlaq7E1LdVog4PWbyJ4q3Aer9GNY8xDQ635JGprAw2');

// Mostrar el formulario
router.get('/', (req, res) => {
    res.render('crearFactura'); // Renderiza el formulario.ejs
});

// Procesar el formulario
router.post('/', async (req, res) => {
    try {
        const { idCustomer,
                itemQuantity,
                product_id,
                folio_number,
                series,
                payment_code 
          } = req.body;

          const invoice = await facturapi.invoices.create({
            customer: 
                idCustomer,
            items: [{
              quantity: itemQuantity,
              product: product_id
            }],
            payment_form: payment_code,
            folio_number: folio_number,
            series: series
          });

        console.log(invoice);
        res.send('Factura creada correctamente.');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error interno del servidor');
    }
});

module.exports = router;
