const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');
const template = require('./template');
const { getInsights } = require('./middleware/symblAi');
const axios = require('axios');

// const fs = require('fs');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

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
            format: "A4",
            margin: {
                top: '25px',
                right: '10px',
                bottom: '25px',
                left: '10px'
            },
            printBackground: true
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

const getToken = async (req, res) => {

    // console.log(process.env.AUTH_TOKEN);
    try {
        const response = await axios.post(
            'https://api.symbl.ai/oauth2/token:generate',{
                type: 'application',
                appId: `${process.env.APP_ID}`,
                appSecret: `${process.env.APP_SECRET}`,
                json: true
        });
        // console.log(response)
        // console.log("response.accessToken => " + response.data.accessToken)
        res.status(200).json({
            accessToken: response.data.accessToken
          });
    } catch (error) {
        console.log(error);
    }    
    
};

app.post('/create-pdf', getInsights, init);

// app.get('/fetch-pdf', (req,res) => {
//     res.sendFile(`${__dirname}/notes.pdf`);
// });

app.get('/getToken', getToken);


app.listen(port, () => console.log(`Server started on port ${port}`));