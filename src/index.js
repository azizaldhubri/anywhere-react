import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './Css/components/loading.css'
import './Css/components/button.css';
import './Css/components/alerts.css'
import './Css/components/google.css';
import './Pages/Auth/Auth.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-loading-skeleton/dist/skeleton.css';

import './custom.css';

import App from './App';
// import { BrowserRouter as Router } from 'react-router-dom'; 
import { BrowserRouter as Router } from 'react-router-dom';
import MenuContext from './Context/MenuContext';
import WindowContext from './Context/WindowContext';
import MenuContextLeft from './Context/MenueContextLeft';
import { UserProvider } from './Context/UserProvider';
 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
     <WindowContext>
      <MenuContext>
        <MenuContextLeft> 
        <UserProvider>
          <Router>       
          <App />    
          </Router>           
          </UserProvider>       
        </MenuContextLeft>        
      </MenuContext>
    </WindowContext>

   
  // </React.StrictMode>
);



