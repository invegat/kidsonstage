/* eslint-disable no-throw-literal */
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const asyncValidate = values =>
  sleep(1000) // simulate server latency
    .then(() => {
      if (['foo@foo.com', 'bar@bar.com'].includes(values.email)) {
        throw { email: 'Email already Exists' };
      }
    });

export default asyncValidate;
