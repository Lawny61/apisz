const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express()
app.use(cors())

app.get('/',async(req,res) => {
    await res.send('The api is online')
});
app.get('/more',async(req,res) => {
    res.send('You are about to be redirected')
    setTimeout(() => {
        res.redirect('https://deriv.codeflim.com')
    },2000)
})
app.listen(3000)
