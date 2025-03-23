import App from './App';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';


createRoot(document.getElementById('root')!).render(
  <Auth0Provider
    domain="dev-ygwt3sjizi4hjzht.us.auth0.com"
    clientId="Tg5k7LDlUws4GTFvs6WwmVVxzSFdZJvK"
    authorizationParams={{
      redirect_uri: window.location.origin + '/callback'
    }}
  >
    <App />
  </Auth0Provider>
);
