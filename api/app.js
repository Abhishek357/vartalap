const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');
const template = require('./template');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// routes 
const printPdf = async (req,res) => {
    try{
        console.log('Starting: Generating PDF Process, Kindly wait ..');
        /** Launch a headleass browser */
        const browser = await puppeteer.launch({ headless: true });
        /* 1- Ccreate a newPage() object. It is created in default browser context. */
        const page = await browser.newPage();
        /* 2- Will open our generated `.html` file in the new Page instance. */
        await page.setContent(template(req.body))

        let pdf = await page.pdf({format: "A4"});

        /* 4- Cleanup: close browser. */
        await browser.close();
        console.log('Ending: Generating PDF Process');
        return pdf;
    }
    catch(error){
        res.json({err:"Some error occured"})
    }
};

const init = async (req,res) => {
	try {
		const pdf = await printPdf(req,res);
        console.log(typeof(pdf));
        res.json(pdf);

	} catch (error) {
        console.log('Error generating PDF', error);
        res.json({err:error})
	}
};


app.post('/create-pdf', init);

app.listen(port, () => console.log(`Server started on port ${port}`));