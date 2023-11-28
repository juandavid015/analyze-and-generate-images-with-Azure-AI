# Web app: generate and analyze images
Basic and small web application for generating and analyzing images by using OpenAI Dall-3 and Azure image analyzis 4.0 models.

## Local usage
1. run `npm install` for installing project dependecies.
2. create an .env file on the root directory.
3. declare VITE_OPENAI_API_KEY with your Open Ai dall-3 API key credential.
4. declare VITE_AZURE_API_KEY with your Azure computer vision API key credential.
5. execute application by running `npm run dev` on developement mode; or refer package.json for other commands.
   
## React + Vite
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
