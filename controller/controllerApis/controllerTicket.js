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
            format: 'A4',
            printBackground: true,
            landscape: true,
            margin: {
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
            }
        });
        await browser.close();
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=ticketBeauscent.pdf'
        });
        res.send(pdfBuffer);
    }catch (error) {
        console.error('Error al iniciar Puppeteer:', error);
        return res.status(500).json({ error: 'Error al generar el ticket' });
    }

}