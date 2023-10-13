const express = require('express');
const router = express.Router();
const Facturapi = require('facturapi');
const facturapi = new Facturapi('sk_test_zlaq7E1LdVog4PWbyJ4q3Aer9GNY8xDQ635JGprAw2');

// Mostrar el formulario
router.get('/', (req, res) => {
    res.render('index'); // Renderiza el formulario.ejs
});

// Procesar el formulario
router.post('/customers', async (req, res) => {
    try {
        const { nombreCliente, 
            emailCliente, 
            taxIdCliente, 
            taxSystemCliente, 
            zipCliente, 
            streetCliente, 
            exteriorCliente, 
            interiorCliente, 
            neighborhoodCliente, 
            cityCliente, 
            municipalityCliente, 
            stateCliente, 
            countryCliente, 
            phoneCliente } = req.body;


        // Crea un cliente
        const customer = await facturapi.customers.create({
            legal_name: nombreCliente,
            tax_id: taxIdCliente,
            tax_system: taxSystemCliente,    
            address: {
              zip: zipCliente,
              street: streetCliente,
              exterior: exteriorCliente,
              interior: interiorCliente,
              neighborhood: neighborhoodCliente,
              city: cityCliente,
              municipality: municipalityCliente,
              state: stateCliente,
              country: countryCliente

            },
            email: emailCliente,
            phone: phoneCliente
          });
        // Envía una respuesta al cliente
        res.send('Cliente creada y enviada correctamente.');
        console.log(customer);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error interno del servidor');
    }
});

module.exports = router;
