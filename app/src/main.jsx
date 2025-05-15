//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from "react-redux";
import chorusStore from "./store/chorusStore.js";
import {isDev} from "./helpers/index.js";

if (isDev()) console.debug('Running in Dev mode');


createRoot(document.getElementById('root')).render(
  <Provider store={chorusStore}>
    <App />
  </Provider>
)
