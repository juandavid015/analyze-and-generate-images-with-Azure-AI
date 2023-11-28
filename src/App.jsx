import React from 'react';
import './App.css';
import { analyzeImage } from './services/azure-image-analysis';
import { generateImage } from './services/azure-image-generation';
import { useEffect } from 'react';
import { isConfigured as azureImageIsConfigured } from './services/azure-image-analysis';
import { isConfigured as azureImageGenerationIsConfigured } from './services/azure-image-generation';
import headerImg from './assets/header.webp'
import { formatJsonString } from './utils/formatJson';
import { IconAzure, IconHourglass, IconOpenAI, IconReact } from './Icons';

function App() {
  // Save the user inpiut in a state variable
  const [input, setInput] = React.useState('');
  const [processing, setProcessing] = React.useState(false);
  const [results, setResults] = React.useState(null);
  const [error, setError] = React.useState(null);

  const analyzeImageUrl = async (input) => {
    try {
      setProcessing(true)
      setError(null)
      const result = await analyzeImage(input);
      setProcessing(false)
      setResults(result)

    } catch (error) {
      setProcessing(false)
      console.error(error)
    }

  }

  const saveInput = (e) => {
    const input = e.target.value
    setInput(input)
  }

  const displayResults = () => {
    // here we display the results with a bit of formatting
    // by adding space but also identation after and before the curly braces
    return formatJsonString(JSON.stringify(results, null, 4))
  }

  const generateImageByPrompt = async () => {
    try {

      setProcessing(true)
      const result = await generateImage(input);
      setError(null)
      setProcessing(false)
      setResults(result)
      console.log(result)

    } catch (error) {
      console.error(error)
      setProcessing(false)
    }

  }
  useEffect(() => {
    if (!azureImageIsConfigured() || !azureImageGenerationIsConfigured()) {
      setError('Key and/or endpoint not configured for cognitive services.')
    }
    return () => setError(null)

  }, [])

  if (error) return (
    <div className='error'>
      <h1>
        Service unavailable
      </h1>
      <p>{error}</p>
    </div>
  )

  return (
    <>
      <header className='title-header'>
        <div>
          <h1>Computer
            <span> vision </span>
          </h1>
          <p>Use Azure Cognitive Services to analyze images and generate images from text</p>
        </div>
        <div className='header-image-container'>
          <img src={headerImg} alt='computer vision' />
        </div>
      </header>

      <main>
        <label htmlFor='input-image' className='input-container'>
          <span className='label'>Insert URL or type prompt</span>
          <input type="text"
            placeholder='Enter URL to analyze or textual prompt to generate an image'
            id='input-image' className='input-image-text' onChange={saveInput} value={input}
            name='input-image' />
        </label>
        <div className='buttons'>
          <button className='analyze-btn btn'
            onClick={() => analyzeImageUrl(input)}>
            Analyze
          </button>
          <button className='generate-btn btn'
            onClick={() => generateImageByPrompt()}>
            Generate
          </button>
        </div>

        <div className='result-analyze'>
          <div className='processing-results'>

            {processing &&
              <div className='processing'>
                <IconHourglass className='processing-icon' />
                <p>Processing...</p>
              </div>

            }
          </div>
          <div className='results'>
            <pre className='result-text'>

              {displayResults() || JSON.stringify(error, null, 4)}

            </pre>
            {
              (results?.url && !results.error) &&
              <div className='result-analyze-image'>
                <img src={results?.url} alt={'image of '} />
              </div>
            }
          </div>
        </div>
      </main>
      <footer>
        <p>
          Made by
          <a href='https://github.com/juandavid015 ' className='link'
          target='_blank' rel='noreferrer' >
            {` @juandgr`}
          </a>
          <p>
            Using
            <a href='https://learn.microsoft.com/en-us/azure/ai-services/computer-vision/overview-image-analysis?tabs=4-0 ' 
            className='link'
            target='_blank' rel='noreferrer' >
              <span>{` Azure image analysis `}</span>
              <IconAzure className='icon' />,
            </a>
            <a href='https://openai.com/dall-e-3 ' className='link'
            target='_blank' rel='noreferrer' >
      
              <span>{` Dall-E 3`}</span>
              <IconOpenAI className='icon' />
            </a>
            <a href='https://es.react.dev/ ' className='link'
            target='_blank' rel='noreferrer' >
           
              <span>{` and React `}</span>
              <IconReact className='icon' />
            </a>
          </p>
        </p>
      </footer>
    </>
  )
}

export default App;
