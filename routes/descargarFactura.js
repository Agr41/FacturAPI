const express = require('express');
const router = express.Router();
const Facturapi = require('facturapi');
const facturapi = new Facturapi('sk_test_zlaq7E1LdVog4PWbyJ4q3Aer9GNY8xDQ635JGprAw2');
const fs = require('fs');

 // Mostrar el formulario
router.get('/', (req, res) => {
    res.render('dscFactura'); // Renderiza el formulario.ejs
}); 

// Procesar el formulario
router.post('/', async (req, res) => {
    try {
         const { 
            facturaID
          } = req.body; 

          const pdfStream = await facturapi.invoices.downloadPdf(facturaID);
          const pdfFile = fs.createWriteStream('./factura.pdf');
          pdfStream.pipe(pdfFile);

        console.log("Factura descargada");
        res.send('Factura descargada');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error interno del servidor');
    }
});

module.exports = router;