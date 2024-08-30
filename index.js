const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express()
app.use(cors())

app.get('/',async(req,res) => {
    await res.send('The api is online')
});

app.listen(3000)