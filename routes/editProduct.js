const express = require('express');
const router = express.Router();
const Facturapi = require('facturapi');
const facturapi = new Facturapi('sk_test_zlaq7E1LdVog4PWbyJ4q3Aer9GNY8xDQ635JGprAw2');

router.get('/', (req, res) => {
  res.render('editProduct'); // Renderiza el formulario.ejs
});

// Procesar el formulario
router.post('/', async (req, res) => {
  try {
    const {
        product_id,
        description,
        product_key,
        price,
        tax_included,
        taxability,
        tax_rate,
        tax_base,
        tax_type,
        tax_factor,
        tax_withholding,
        local_tax_rate,
        local_tax_type,
        local_tax_base,
        local_tax_withholding,
        unit_key,
        unit_name,
        sku
      } = req.body;

      const updatedFields = {};

      if (description) updatedFields.description = description;
      if (product_key) updatedFields.product_key = product_key;
      if (price) updatedFields.price = price;
      if (tax_included) updatedFields.tax_included = tax_included;
      if (taxability) updatedFields.taxability = taxability;
      if (tax_rate) updatedFields.tax_rate = tax_rate;
      if (tax_base) updatedFields.tax_base = tax_base;
      if (tax_type) updatedFields.tax_type = tax_type;
      if (tax_factor) updatedFields.tax_factor = tax_factor;
      if (tax_withholding) updatedFields.tax_withholding = tax_withholding;
      if (local_tax_rate) updatedFields.local_tax_rate = local_tax_rate;
      if (local_tax_type) updatedFields.local_tax_type = local_tax_type;
      if (local_tax_base) updatedFields.local_tax_base = local_tax_base;
      if (local_tax_withholding) updatedFields.local_tax_withholding = local_tax_withholding;
      if (unit_key) updatedFields.unit_key = unit_key;
      if (unit_name) updatedFields.unit_name = unit_name;
      if (sku) updatedFields.sku = sku;

    const product = await facturapi.products.update(product_id, updatedFields);

    // Envía una respuesta al cliente
    console.log(product);
    res.render('renderProduct', { product });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error interno del servidor');
    }
});

module.exports = router;
