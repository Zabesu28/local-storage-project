/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import express from 'express';
import apicache from 'apicache';
const app = express();
const cache = apicache.middleware;

// Configuration d'apicache
apicache.options({ debug: true });

// Middleware pour gérer les fichiers statiques avec mise en cache
app.use(express.static('public', {
  maxAge: '1d', // Cache-Control: public, max-age=86400 (1 jour en secondes)
  setHeaders: (res, path) => {
    res.setHeader('Cache-Control', 'public, max-age=86400');
  }
}));

// Route avec mise en cache
app.get('/data', cache('10 minutes'), (req, res) => {
  // Simuler une opération coûteuse ou un appel à une API externe
  setTimeout(() => {
    res.json({ message: 'This is cached for 10 minutes', timestamp: Date.now() });
  }, 2000); // Simule un délai de 2 secondes
});

// Route sans mise en cache
app.get('/no-cache', (req, res) => {
  res.json({ message: 'This response is not cached', timestamp: Date.now() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});