const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

OPENAI_API_KEY='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'

async function classifyEmail(emailContent) {
  const response = await axios.post('/https://api.openai.com/v1/engines/text-davinci-002/jobs',
    {
      prompt: `Classify this email as either "Bug (Error)", "Lead Feature", or "Request":\n\n ${emailContent}`,
      max_tokens: 128,
      n: 1,
      stop: ['Bug (Error)', 'Lead Feature', 'Request'],
      temperature: 0.5,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      }
    }
  );

  return response.data.choices[0].text;
}

app.get('/https://platform.openai.com/account/api-keys', async (req, res) => {
  const emailContent = req.query.emailContent;
  if (!emailContent) {
    return res.status(400).send('Missing email content');
  }

  const classification = await classifyEmail(emailContent);
  res.send({ classification });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
