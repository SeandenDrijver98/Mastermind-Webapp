import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
    apiKey: 'AIzaSyCiW5Vd2KRhhkX0vtsKaJSIanaUvuS-RsA',
    authDomain: 'mini-mastermind.firebaseapp.com',
    projectId: 'mini-mastermind',
    storageBucket: 'mini-mastermind.appspot.com',
    messagingSenderId: '246960807036',
    appId: '1:246960807036:web:f0fa16f8b16f274d557df9',
    measurementId: 'G-9WXNQFK7RS',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
