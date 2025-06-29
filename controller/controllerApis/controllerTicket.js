const puppeteer = require('puppeteer');

exports.createTicket = async (req,res) =>{
    const { dataTicket} = req.body;
    console.log(req.body+"HOLA ACA ESTA")
    console.log("HTML recibido:", dataTicket?.slice?.(0, 500)); // solo una parte 

    if (!dataTicket) {
        return res.status(400).send("No se recibió contenido HTML.");
    }
    try{
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();
        await page.setContent(dataTicket, { waitUntil: 'networkidle0' });
        const pdfBuffer = await page.pdf({
            format: 'A5',
            printBackground: true,
            margin: {
                top: '20px',
                right: '20px',
                bottom: '20px',
                left: '20px'
            }
        });
        await browser.close();
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=ticket.pdf'
        });
        console.log(pdfBuffer+"HOLA ACA ESTA PDFBUFFER")
        res.send(pdfBuffer);
    }catch (error) {
        console.error('Error al iniciar Puppeteer:', error);
        return res.status(500).json({ error: 'Error al generar el ticket' });
    }

}