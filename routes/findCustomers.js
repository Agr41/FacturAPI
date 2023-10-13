const express = require('express');
const router = express.Router();
const Facturapi = require('facturapi');
const facturapi = new Facturapi('sk_test_zlaq7E1LdVog4PWbyJ4q3Aer9GNY8xDQ635JGprAw2');

// Procesar el formulario
router.get('/', async (req, res) => {
    res.render('findCustomers');
});

router.post('/', async (req, res) => {
        try {
        const { qCliente,
                gteCliente,
                lteCliente,
                limitCliente,
                //pageCliente
                } = req.body;

                const formattedGteCliente = `${gteCliente}T00:00:00.000Z`;
        const dateQuery = {
          gt: new Date((formattedGteCliente)), // Añadir la hora de inicio del día
          lt: new Date(`${lteCliente}T23:59:59.999Z`)      // Añadir la hora de fin del día
      };

        // Crea un cliente
        const searchResult = await facturapi.customers.list({
            q: qCliente,
              date: {
                date: dateQuery
            },
            limit: limitCliente,
            //page: pageCliente
          });
        // Envía una respuesta al cliente
        res.render('searchResult', { searchResult });
        console.log(dateQuery);
        console.log(searchResult);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error interno del servidor');
    } 
});

module.exports = router;
