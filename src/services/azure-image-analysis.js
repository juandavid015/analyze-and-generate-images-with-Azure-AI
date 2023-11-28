const resourceRegion = 'eastus'
const apiVersion = '2023-02-01-preview'
const SUBSCRIPTION_KEY = import.meta.env.VITE_AZURE_API_KEY || ''

export const isConfigured = () => {
    if (!SUBSCRIPTION_KEY) {
        return false
    } else return true
}

export const analyzeImage = async (url) => {
    try {
        const response = await fetch(
            `https://${resourceRegion}.api.cognitive.microsoft.com/computervision/imageanalysis:analyze?api-version=${apiVersion}&mode=backgroundRemoval&features=caption`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY
                },
                body: JSON.stringify({ url }),
            })
        let data = await response.json()
        data.url = url
        return data

    } catch (error) {
        throw new Error(error.message)
    }


}

