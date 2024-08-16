const axios = require('axios');
const crypto = require('crypto');

const phonepe = {
  createPayment: async (amount, orderId) => {
    const url = 'https://api.phonepe.com/apis/hermes/pg/v1/pay';
    const merchantId = 'YOUR_MERCHANT_ID';
    const merchantTransactionId = orderId;
    const payload = {
      merchantId,
      merchantTransactionId,
      amount,
      callbackUrl: 'YOUR_CALLBACK_URL'
    };

    const secretKey = 'YOUR_SECRET_KEY';
    const xVerifyHeader = crypto.createHmac('sha256', secretKey)
      .update(JSON.stringify(payload))
      .digest('base64') + '###' + merchantId;

    const response = await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json',
        'X-VERIFY': xVerifyHeader
      }
    });

    return response.data;
  }
};

module.exports = phonepe;
