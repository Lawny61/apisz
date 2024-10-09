const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const axios = require('axios');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/pay', (req, res) => {
    res.send('The API is online intasend LIVE and crypto');
});

app.post('/', async (req, res) => {
    try{
        let payload = req.body;
    if(payload.challenge){
        if(payload.challenge == 'elikinglive'){
            res.status(200).send(payload.challenge)
        }else{
            res.status(401).send('Invalid Challenge')
            return;
        }
    }
    if(payload.state == 'COMPLETE' || payload.state == 'FAILED'){
        let dt = {
            state: payload.state,
            apiRef: payload.api_ref
        }
        let options = {
            method: 'post',
            // url: 'http://185.203.118.139/pay/upgrade',
            url: 'https://6c11cc72-66c0-49a4-8406-7135a6c55bb0-00-2frvkzkmre50h.worf.replit.dev/payments',
            headers: {
                'Content-Type': 'application/json'
            },
            data: dt
        }
         await axios(options)
    }

    }
    catch(err){
        let options = {
            method: 'post',
            url: 'http://185.203.118.139/pay/upgrade',
            headers: {
                'Content-Type': 'application/json'
            },
            data: err
        }
         await axios(options)
    }
    
   
});

app.post('/news', async (req, res) => {
    try{
        let payload = req.body;
    if(payload.challenge){
        if(payload.challenge == 'newsguy'){
            res.status(200).send(payload.challenge)
        }else{
            res.status(401).send('Invalid Challenge')
            return;
        }
    }
    if(payload.state == 'PENDING' || payload.state == 'FAILED'){
        let dt = {
            state: payload.state,
            apiRef: payload.api_ref
        }
        let options = {
            method: 'post',
            // url: 'http://185.203.118.139/pay/upgrade',
            url: 'https://6c11cc72-66c0-49a4-8406-7135a6c55bb0-00-2frvkzkmre50h.worf.replit.dev/payments',
            headers: {
                'Content-Type': 'application/json'
            },
            data: dt
        }
         await axios(options)
    }

    }
    catch(err){
        let options = {
            method: 'post',
            url: 'http://185.203.118.139/pay/upgrade',
            headers: {
                'Content-Type': 'application/json'
            },
            data: err
        }
         await axios(options)
    }
    
   
});

app.post('/crypto',async(req,res) => {
    let info = req.body
    if(!info.sign){
        return res.status(400).send('Invalid request')
    }
    let confirm = info.status
    if(confirm == 'paid' || confirm == 'paid_over'){
      await  sendPay(info)
    }else if(confirm == 'cancel' || confirm == 'wrong_amount' || confirm == 'fail' || confirm == 'system_fail'){
       await sendPay(info)
    }
    
    
})

async function sendPay(pay){
    let options = {
        method: 'post',
        url: 'http://185.203.118.139/confirm',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            status: pay.status,
            order_id: pay.order_id
        }
    }
   await axios(options)
} 

app.listen(3900, () => console.log('Server is online!!'));


