// BafingPay Marketplace - Version simplifiée
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5002;

// Configuration Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
  { auth: { persistSession: false } }
);

// Middleware
app.use(cors());
app.use(express.json());

// Test API
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: "BafingPay Marketplace API is running!",
    version: "1.0.0",
    timestamp: new Date().toISOString()
  });
});

// Test Supabase connection
app.get('/api/health', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('id')
      .limit(1);
    
    res.json({
      success: true,
      supabase: error ? "checking" : "connected",
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.json({
      success: true,
      supabase: "error",
      error: err.message
    });
  }
});

// Interface Marketplace simple
app.get('/', (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html lang="fr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🛒 BafingPay Marketplace</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <style>
      body { font-family: 'Segoe UI', system-ui, sans-serif; }
      .gradient-bg { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
    </style>
  </head>
  <body class="bg-gray-50 min-h-screen">
    <!-- Navigation -->
    <nav class="gradient-bg text-white shadow-lg">
      <div class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-3">
            <div class="bg-white p-2 rounded-lg">
              <i class="fas fa-shopping-bag text-blue-600 text-xl"></i>
            </div>
            <div>
              <h1 class="text-xl font-bold">BafingPay Marketplace</h1>
              <p class="text-sm opacity-90">E-commerce Professionnel 2026</p>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <a href="#" class="hover:opacity-80">Accueil</a>
            <a href="#" class="hover:opacity-80">Produits</a>
            <a href="#" class="hover:opacity-80">Marchands</a>
            <a href="/api" class="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100">
              API Status
            </a>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <div class="container mx-auto px-4 py-16 text-center">
      <div class="max-w-3xl mx-auto">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Bienvenue sur la Marketplace BafingPay
        </h2>
        <p class="text-lg text-gray-600 mb-8">
          La première plateforme e-commerce intégrée à l'écosystème BafingPay.
          Paiements sécurisés, gestion intelligente, analytics en temps réel.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button onclick="window.location.href='/marketplace'" 
                  class="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium">
            <i class="fas fa-shopping-cart mr-2"></i>
            Découvrir la Marketplace
          </button>
          <button onclick="window.location.href='/api'" 
                  class="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-900 font-medium">
            <i class="fas fa-code mr-2"></i>
            Voir l'API
          </button>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div class="bg-white p-6 rounded-xl shadow-md">
            <div class="text-3xl text-blue-600 mb-3">
              <i class="fas fa-bolt"></i>
            </div>
            <h3 class="text-xl font-semibold mb-2">Rapide</h3>
            <p class="text-gray-600">Interface optimisée pour une expérience fluide</p>
          </div>
          
          <div class="bg-white p-6 rounded-xl shadow-md">
            <div class="text-3xl text-green-600 mb-3">
              <i class="fas fa-shield-alt"></i>
            </div>
            <h3 class="text-xl font-semibold mb-2">Sécurisé</h3>
            <p class="text-gray-600">Paiements BafingPay 100% sécurisés</p>
          </div>
          
          <div class="bg-white p-6 rounded-xl shadow-md">
            <div class="text-3xl text-purple-600 mb-3">
              <i class="fas fa-chart-line"></i>
            </div>
            <h3 class="text-xl font-semibold mb-2">Intelligent</h3>
            <p class="text-gray-600">Analytics Fenigama intégrés</p>
          </div>
        </div>

        <!-- API Info -->
        <div class="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 class="text-2xl font-semibold text-blue-800 mb-4">🛠 API Documentation</h3>
          <div class="text-left space-y-2">
            <p><code class="bg-gray-800 text-green-400 px-2 py-1 rounded">GET /api</code> → Status de l'API</p>
            <p><code class="bg-gray-800 text-green-400 px-2 py-1 rounded">GET /api/health</code> → Santé Supabase</p>
            <p><code class="bg-gray-800 text-green-400 px-2 py-1 rounded">GET /marketplace</code> → Interface complète</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Marketplace Interface (simplifiée) -->
    <div id="marketplace" class="hidden">
      <!-- Le code complet de l'interface sera chargé ici plus tard -->
    </div>

    <footer class="bg-gray-800 text-white py-8 mt-8">
      <div class="container mx-auto px-4 text-center">
        <p>© 2026 BafingPay Marketplace. Tous droits réservés.</p>
        <p class="mt-2 text-gray-400 text-sm">
          Déployé sur Railway • Intégré avec Supabase • 
          <a href="https://github.com/Alpha11201/bafingpay-marketplace" class="text-blue-300 hover:text-white">
            Voir sur GitHub
          </a>
        </p>
      </div>
    </footer>

    <script>
      // JavaScript simple pour la démo
      console.log("BafingPay Marketplace loaded!");
      
      // Ajouter marketplace route dynamiquement
      app.get('/marketplace', (req, res) => {
        res.send('<h1>Marketplace Interface - Coming Soon!</h1>');
      });
    </script>
  </body>
  </html>
  `);
});

// Marketplace route
app.get('/marketplace', (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html lang="fr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🛒 Marketplace - BafingPay</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-gray-50">
    <div class="container mx-auto px-4 py-16 text-center">
      <h1 class="text-4xl font-bold text-gray-800 mb-6">Marketplace BafingPay</h1>
      <p class="text-gray-600 mb-8">L'interface complète sera disponible bientôt!</p>
      <a href="/" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
        Retour à l'accueil
      </a>
    </div>
  </body>
  </html>
  `);
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`
  🚀 BafingPay Marketplace démarré!
  🌐 Accueil: http://localhost:${PORT}/
  🔗 API: http://localhost:${PORT}/api
  📊 Santé: http://localhost:${PORT}/api/health
  🛒 Marketplace: http://localhost:${PORT}/marketplace
  `);
});
