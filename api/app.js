const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');
const template = require('./template');
const { getInsights } = require('./middleware/symblAi');
// const fs = require('fs');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// routes 
const printPdf = async (req,res) => { 
    try{
        console.log('Starting: Generating PDF Process, Kindly wait ..');
        /** Launch a headleass browser */
        const browser = await puppeteer.launch();
        /* 1- Ccreate a newPage() object. It is created in default browser context. */
        const page = await browser.newPage();
        /* 2- Will open our generated `.html` file in the new Page instance. */
        await page.setContent(template(req.insight))

        let pdf = await page.pdf({
            format: "Tabloid",
            margin: {
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px'
            }
        });

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
		res.set({'Content-Type': 'application/pdf', 'Content-Length': pdf.length})
        res.json(pdf)
        // fs.writeFileSync('notes.pdf', pdf);
        // console.log('Success');
        // res.sendFile(`${__dirname}/notes.pdf`);
        // res.json({msg:"Pdf generated successfully"});

	} catch (error) {
        console.log('Error generating PDF', error);
        res.json({err:error})
	}
};


app.post('/create-pdf', getInsights, init);

// app.get('/fetch-pdf', (req,res) => {
//     res.sendFile(`${__dirname}/notes.pdf`);
// });




app.listen(port, () => console.log(`Server started on port ${port}`));