import { OPEN_AI_BASE_URL } from '../constants/openAI.js';
import { IGptResponse } from '../interfaces/responses/gpt-api.js';
import dotenv from 'dotenv';
dotenv.config();

export const openAIRequest = (prompt: string) => {
  return fetch(OPEN_AI_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini', // 'gpt-4o-mini-2024-07-18', //'gpt-3.5-turbo-0125',//'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 1,
      max_tokens: 4095,
      top_p: 1,
      response_format: { type: 'json_object' },
    }),
  })
    .then((gptData) => gptData.json())
    .then((gptRes: IGptResponse) => {
     // console.log(gptRes.choices[0].message.content);
      let arrRes;
      const gptMessageString = JSON.parse(gptRes.choices[0].message.content);
      if (!Array.isArray(gptMessageString)) {
        console.log("Returning Object");
        
        const gptMessageObject = JSON.parse(gptRes.choices[0].message.content);
        const singleKey = Object.keys(gptMessageObject)[0];
        const singleValue = gptMessageObject[singleKey];
        arrRes = singleValue;
        return arrRes;
      } else {
        console.log("Returning Arr");
        arrRes = gptMessageString;
        return arrRes;
      }
    })
    .catch((err) => err);
};
