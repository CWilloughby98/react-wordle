import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY
const openai = new OpenAI({apiKey, dangerouslyAllowBrowser: true});

export const generateWord = async () => {
    try {
        const randomGeneratedWord = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {"role": "system", "content": `You are an AI that provides me with a VERY random word.`},
                {"role": "user", "content": `Write a word that is ${5} letters long. Answer with only that word and in lowercase.`}
            ]
        });

        const word = randomGeneratedWord.choices[0].message.content.trim(); // Parse response
        return word;
    } catch (error) {
        console.error("Error generating word:", error);
        throw error;
    }
}