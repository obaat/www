import _stripe from 'stripe';
import aws from 'aws-sdk';

const stripe = _stripe(process.env.STRIPE_SECRET_KEY);
const ses = new aws.SES({ region: process.env.REGION });

const sendEmail = async (charge) => {
  const {amount, currency, source: {name, brand, country}} = charge;

  const emailParams = {
    Destination: { ToAddresses: ["simon@papercreatures.com"], },
    Message: { Body: { Text: { Data: `
A new donation has been received
From: ${name}
Amount: ${amount} ${currency}
` } } },
    Subject: { Data: `Donation for £${amount} from ${name}`, },
    Source: "website@onebrick.org.uk",
  };

  const email = await ses.sendEmail(emailParams);
};

export const handler = async (event, context, callback) => {
  const requestBody = JSON.parse(event.body);
  const token = requestBody.token.id;
  const {amount, currency} = requestBody.charge;

  try {
    const charge = await stripe.charges.create({
      amount,
      currency,
      description: 'One Brick Donation',
      source: token,
    });

    await sendEmail(charge);

    const response = {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*', },
      body: JSON.stringify({ message: `Charge processed succesfully!`, status: charge.status, amount: charge.amount }),
    };
    callback(null, response);
  } catch (err) {
    // console.error(err);
    const response = {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        error: err.message,
      }),
    };
    callback(null, response);
  }
};
