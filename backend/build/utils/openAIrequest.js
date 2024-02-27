import { OPEN_AI_BASE_URL } from '../constants/openAI.js';
import dotenv from 'dotenv';
dotenv.config();
export const openAIRequest = (prompt) => {
    return fetch(OPEN_AI_BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            temperature: 1,
            max_tokens: 500,
        }),
    })
        .then((gptData) => gptData.json())
        .then((gptRes) => {
        const gptMessageString = JSON.parse(gptRes.choices[0].message.content);
        return gptMessageString;
    })
        .catch((err) => err);
};
//# sourceMappingURL=openAIrequest.js.map