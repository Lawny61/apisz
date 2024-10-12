const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const validateChallenge = (challenge, expectedChallenge) => {
  if (challenge !== expectedChallenge) {
    throw new Error('Invalid Challenge');
  }
};

const sendRequest = async (url, data) => {
  const options = {
    method: 'post',
    url,
    headers: { 'Content-Type': 'application/json' },
    data
  };
  return axios(options);
};

app.get('/', (req, res) => {
  res.send('The API is online intasend LIVE and crypto');
});

app.post('/', async (req, res) => {
  try {
    const payload = req.body;

    // if (payload.challenge) {
    //   validateChallenge(payload.challenge, 'elikinglive');
    //   return res.status(200).send(payload.challenge);
    // }

    if (payload.state === 'COMPLETE' || payload.state === 'FAILED') {
      const data = { state: payload.state, apiRef: payload.api_ref };
      res.json(data);
      // await sendRequest('http://185.203.118.139/pay/upgrade', data);
      await sendRequest('https://5006-102-0-3-116.ngrok-free.app/pay', data);
    }
  } catch (err) {
    if (err.message === 'Invalid Challenge') {
      return res.status(401).send('Invalid Challenge');
    }
    await sendRequest('http://185.203.118.139/pay/upgrade', err);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/news', async (req, res) => {
  try {
    const payload = req.body;

    if (payload.challenge) {
      validateChallenge(payload.challenge, 'newsguy');
      return res.status(200).send(payload.challenge);
    }

    if (payload.state === 'PENDING' || payload.state === 'FAILED') {
      const data = { state: payload.state, apiRef: payload.api_ref };
      await sendRequest('http://185.203.118.139/news/upgrade', data);
      res.json(data);
    }
  } catch (err) {
    if (err.message === 'Invalid Challenge') {
      return res.status(401).send('Invalid Challenge');
    }
    await sendRequest('http://185.203.118.139/news/upgrade', err);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/crypto', async (req, res) => {
  const info = req.body;
  if (!info.sign) {
    return res.status(400).send('Invalid request');
  }

  const confirm = info.status;
  if (['paid', 'paid_over', 'cancel', 'wrong_amount', 'fail', 'system_fail'].includes(confirm)) {
    await sendPay(info);
    res.status(200).send('Payment processed');
  } else {
    res.status(400).send('Invalid status');
  }
});

async function sendPay(pay) {
  await sendRequest('http://185.203.118.139/confirm', {
    status: pay.status,
    order_id: pay.order_id
  });
}

const PORT = process.env.PORT || 3900;
app.listen(PORT, () => console.log(`Server is online on port ${PORT}!`));
