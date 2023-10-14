const express = require('express');
const router = express.Router();
const Facturapi = require('facturapi');
const facturapi = new Facturapi('sk_test_zlaq7E1LdVog4PWbyJ4q3Aer9GNY8xDQ635JGprAw2');

// Mostrar el formulario
router.get('/', (req, res) => {
    res.render('createProduct'); // Renderiza el formulario.ejs
});

// Procesar el formulario
router.post('/', async (req, res) => {
    try {
        const { descriptionProducto, 
            keyProducto, 
            priceProducto, 
            taxIncludedProducto, 
            taxabilityProducto, 
            taxesType, 
            taxesRate, 
            taxesBase, 
            taxesFactor, 
            taxesWithholding,
            taxesLocalType, 
            taxesLocalRate, 
            taxesLocalBase,  
            taxesLocalWithholding, 
            unitKey,
            unitName,
            sku
          } = req.body;

          const isChecked = taxIncludedProducto === 'on'; 
          const booleanTax = isChecked ? 'true' : 'false'; 

        // Crea un cliente
        const product = await facturapi.products.create({
     
            description: descriptionProducto,
            product_key: keyProducto,
            price: priceProducto,
            tax_included: booleanTax,
            taxability: taxabilityProducto,
             taxes: [
              {
                type: taxesType,
                rate: taxesRate,
                base: taxesBase,
                factor: taxesFactor,
                withholding: true

              }
            ], 
             local_taxes: [
                {
                  type: taxesLocalType,
                  rate: taxesLocalRate,
                  base: taxesLocalBase,
                    withholding: true
    
                  }
            ], 
            unit_key: unitKey,
            unit_name: unitName,
            sku: sku
          });
        // Envía una respuesta al cliente

        console.log(req.body);
        console.log(product);
        res.render('renderProduct', { product });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error interno del servidor');
    }
});

module.exports = router;
