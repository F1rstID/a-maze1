//* 6자리 랜덤한 숫자 생성
function generateRandomNumber() {
  const min = 100000;
  const max = 999999;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
}

async function sendMessage(phoneNumber) {
  let result = '';
  const coolsms = require('coolsms-node-sdk').default;

  const randomNumber = generateRandomNumber();

  // apiKey, apiSecret 설정
  const messageService = new coolsms(
    process.env.COOL_SMS_KEY,
    process.env.COOL_SMS_SECRET
  );

  await messageService
    .sendOne({
      to: phoneNumber,
      from: '01055857044',
      text: `[메이즈 백엔드 채용] 본인확인 인증번호는 [${randomNumber}] 입니다.`,
    })
    .then((res) => {
      result = res;
    })
    .catch((err) => {
      result = err;
    });
  return result;
}
module.exports = sendMessage;
