import OpenAI from "openai";
const OPEN_AI_KEY = import.meta.env.VITE_OPENAI_API_KEY || ''

const configuration = ({
    apiKey: OPEN_AI_KEY,
    maxRetries: 1,
    dangerouslyAllowBrowser: true
});
const openai = new OpenAI(configuration);

export const isConfigured = () => {
    if (!OPEN_AI_KEY) {
        return false
    } else return true
}
export const generateImage = async (prompt) => {
    // const url = `https://api.openai.com/v1/images/generations`

    try {

        const response = await openai.images.generate({ 
            model: "dall-e-3", 
            prompt,
            n: 1,
        });
        return response.data[0]

    } catch (error) {
        throw new Error(error.message)
    }

}