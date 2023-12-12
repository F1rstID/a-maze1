require('dotenv').config();

async function receiveMessage(messageId) {
  let result = '';

  const crypto = require('crypto');
  const axios = require('axios');

  const now = new Date().toISOString();
  // 16진수 64자의 랜덤 값 생성
  const genRanHex = (size) =>
    [...Array(size)]
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join('');
  const salt = genRanHex(64);
  const message = now + salt;
  const apiKey = process.env.COOL_SMS_KEY;
  const apiSecret = process.env.COOL_SMS_SECRET;
  const signature = crypto
    .createHmac('sha256', apiSecret)
    .update(message)
    .digest('hex');

  // 생성한 시그니처를 사용하여 API 호출
  const uri = `https://api.coolsms.co.kr/messages/v4/list?criteria=messageId&value=${messageId}&cond=eq&limit=1`;
  await axios
    .get(uri, {
      headers: {
        Authorization: `HMAC-SHA256 apiKey=${apiKey}, date=${now}, salt=${salt}, signature=${signature}`,
      },
    })
    .then((res) => {
      result = res;
    })
    .catch((err) => {
      result = err;
    });
  return result;
}

module.exports = receiveMessage;
