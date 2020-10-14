const express = require('express')
const app = express()
const cors = require('cors')
const bodyparser = require('body-parser')
const secretKey = ''  /////own key
const stripe = require('stripe')(secretKey)
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
app.use(cors())
app.post('/pay', async (req, res) => {
  console.log(req.body);
  const data = await stripe.charges.create({
    amount: req.body.amount,
    currency: "cad",
    source: req.body.token,
    receipt_email: 'hikkiabc@gmail.com'
  })
  res.send(data)
})

app.listen(3000, () => {
  console.log('3000 on');
})