import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

import {HashRouter} from 'react-router-dom'

//components 
import List from './Components/List'
import RecipeDashboard from './Components/RecipeDashboard'
import RecipeLanding from './Components/RecipeLanding'
import SpecificRecipe from './Components/SpecificRecipe'

ReactDOM.render(
<HashRouter>
    <App />
</HashRouter>
, document.getElementById('root'));
// registerServiceWorker();
