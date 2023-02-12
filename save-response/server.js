const axios = require('axios');
const fs = require('fs');
const API_KEY = "YOUR_API_KEY";

async function classifyEmail(emailContent) {
  try {
    const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-002/jobs', {
      prompt: 'Classify the following email content into Bug (Error), Lead Feature, Request categories: ' + emailContent,
      max_tokens: 128,
      temperature: 0.7,
      n: 1
    },
    {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      }
    });
  
    const classification = response.data.choices[0].text;

    // Write the response to a file
    fs.writeFile('classification.txt', classification, 'utf-8', (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });

    return classification;
  } catch (error) {
    console.error(error);
  }
}

// Example usage
const emailContent = "Hello, I am having an issue with the app. It keeps crashing. Can you please help?";
classifyEmail(emailContent).then(classification => {
  console.log("Classification: ", classification);
});
