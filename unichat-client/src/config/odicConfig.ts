export const oidcConfig = {
  authority: 'https://your-oidc-provider.com/auth/realms/your-realm',
  client_id: 'your-client-id',
  redirect_uri: 'http://localhost:3000/callback',
  response_type: 'code',
  scope: 'openid profile email',
};

