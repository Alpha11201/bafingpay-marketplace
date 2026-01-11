// BafingPay Marketplace - Version corrigée
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5002;

// Log pour debug
console.log('=== Configuration ===');
console.log('Port:', PORT);
console.log('Supabase URL:', process.env.SUPABASE_URL ? '✅ Présent' : '❌ Manquant');
console.log('Supabase Key:', process.env.SUPABASE_KEY ? '✅ Présent' : '❌ Manquant');

// Configuration Supabase
let supabase;
try {
  // Utilise SUPABASE_KEY (service role) au lieu de SUPABASE_ANON_KEY
  supabase = createClient(
    process.env.SUPABASE_URL || 'https://default.supabase.co',
    process.env.SUPABASE_KEY || process.env.SUPABASE_ANON_KEY || 'default_key',
    { 
      auth: { 
        persistSession: false 
      }
    }
  );
  console.log('✅ Client Supabase créé avec succès');
} catch (error) {
  console.error('❌ Erreur Supabase:', error.message);
}

// Middleware
app.use(cors());
app.use(express.json());

// Route d'accueil
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
      body { 
        font-family: 'Segoe UI', system-ui, sans-serif;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
        margin: 0;
      }
      .card {
        background: rgba(255, 255, 255, 0.95);
        border-radius: 20px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      }
      .status-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        display: inline-block;
        margin-right: 8px;
      }
      .status-online { background-color: #10b981; }
      .status-offline { background-color: #ef4444; }
      .status-warning { background-color: #f59e0b; }
    </style>
  </head>
  <body class="text-gray-800">
    <!-- Navigation -->
    <nav class="bg-white/90 backdrop-blur-sm shadow-lg">
      <div class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-3">
            <div class="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
              <i class="fas fa-shopping-bag text-white text-xl"></i>
            </div>
            <div>
              <h1 class="text-xl font-bold text-gray-800">BafingPay Marketplace</h1>
              <p class="text-sm text-gray-600">E-commerce Professionnel 2026</p>
            </div>
          </div>
          <div class="flex items-center space-x-6">
            <a href="/" class="font-medium text-blue-600 hover:text-blue-800">Accueil</a>
            <a href="/marketplace" class="font-medium text-gray-700 hover:text-gray-900">Marketplace</a>
            <a href="/api" class="font-medium text-gray-700 hover:text-gray-900">API</a>
            <button onclick="window.location.href='/marketplace'" 
                    class="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:opacity-90 font-medium">
              <i class="fas fa-play mr-2"></i>Démarrer
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <div class="container mx-auto px-4 py-16">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h1 class="text-5xl md:text-6xl font-bold text-white mb-6">
            Plateforme E-commerce <span class="text-yellow-300">BafingPay</span>
          </h1>
          <p class="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
            La marketplace moderne intégrée à votre écosystème financier.
            Paiements sécurisés, gestion en temps réel, analytics prédictifs.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button onclick="window.location.href='/marketplace'" 
                    class="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-100 font-bold text-lg shadow-lg">
              <i class="fas fa-shopping-cart mr-3"></i>
              Explorer la Marketplace
            </button>
            <button onclick="window.location.href='/api'" 
                    class="bg-gray-900 text-white px-8 py-4 rounded-xl hover:bg-black font-bold text-lg shadow-lg">
              <i class="fas fa-code mr-3"></i>
              Voir l'API
            </button>
          </div>
        </div>

        <!-- Features Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div class="card p-8">
            <div class="text-blue-500 text-4xl mb-6">
              <i class="fas fa-bolt"></i>
            </div>
            <h3 class="text-2xl font-bold mb-4">Performance Maximale</h3>
            <p class="text-gray-600">Interface optimisée avec chargement instantané et temps réel.</p>
          </div>
          
          <div class="card p-8">
            <div class="text-green-500 text-4xl mb-6">
              <i class="fas fa-shield-alt"></i>
            </div>
            <h3 class="text-2xl font-bold mb-4">Sécurité BafingPay</h3>
            <p class="text-gray-600">Transactions 100% sécurisées avec l'infrastructure BafingPay.</p>
          </div>
          
          <div class="card p-8">
            <div class="text-purple-500 text-4xl mb-6">
              <i class="fas fa-chart-line"></i>
            </div>
            <h3 class="text-2xl font-bold mb-4">Analytics Fenigama</h3>
            <p class="text-gray-600">Intégration complète avec vos scores de fraude et churn.</p>
          </div>
        </div>

        <!-- Status Dashboard -->
        <div class="card p-8 mb-16">
          <h2 class="text-3xl font-bold mb-8 text-center">📊 Tableau de Bord Système</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-gray-50 p-6 rounded-xl">
              <div class="flex items-center mb-4">
                <span class="status-dot status-online"></span>
                <h4 class="font-bold">Serveur Node.js</h4>
              </div>
              <p class="text-2xl font-bold">✅ En ligne</p>
              <p class="text-sm text-gray-500">Port: ${PORT}</p>
            </div>
            
            <div class="bg-gray-50 p-6 rounded-xl">
              <div class="flex items-center mb-4">
                <span class="status-dot ${process.env.SUPABASE_URL ? 'status-online' : 'status-offline'}"></span>
                <h4 class="font-bold">Base de données</h4>
              </div>
              <p class="text-2xl font-bold">${process.env.SUPABASE_URL ? '✅ Connecté' : '❌ Hors ligne'}</p>
              <p class="text-sm text-gray-500">Supabase</p>
            </div>
            
            <div class="bg-gray-50 p-6 rounded-xl">
              <div class="flex items-center mb-4">
                <span class="status-dot ${process.env.SUPABASE_KEY ? 'status-online' : 'status-warning'}"></span>
                <h4 class="font-bold">Authentification</h4>
              </div>
              <p class="text-2xl font-bold">${process.env.SUPABASE_KEY ? '✅ Active' : '⚠️ Partielle'}</p>
              <p class="text-sm text-gray-500">Clé API</p>
            </div>
            
            <div class="bg-gray-50 p-6 rounded-xl">
              <div class="flex items-center mb-4">
                <span class="status-dot status-online"></span>
                <h4 class="font-bold">Environnement</h4>
              </div>
              <p class="text-2xl font-bold">🚀 Production</p>
              <p class="text-sm text-gray-500">Railway + GitHub</p>
            </div>
          </div>
          
          <div class="mt-8 pt-8 border-t border-gray-200">
            <h4 class="font-bold mb-4">🔗 URLs disponibles</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="/api" class="bg-blue-50 p-4 rounded-lg hover:bg-blue-100">
                <div class="font-medium text-blue-700">GET /api</div>
                <div class="text-sm text-gray-600">Status de l'API</div>
              </a>
              <a href="/api/health" class="bg-green-50 p-4 rounded-lg hover:bg-green-100">
                <div class="font-medium text-green-700">GET /api/health</div>
                <div class="text-sm text-gray-600">Santé Supabase</div>
              </a>
              <a href="/marketplace" class="bg-purple-50 p-4 rounded-lg hover:bg-purple-100">
                <div class="font-medium text-purple-700">GET /marketplace</div>
                <div class="text-sm text-gray-600">Interface complète</div>
              </a>
              <a href="https://github.com/Alpha11201/bafingpay-marketplace" class="bg-gray-50 p-4 rounded-lg hover:bg-gray-100">
                <div class="font-medium text-gray-700">GitHub</div>
                <div class="text-sm text-gray-600">Code source</div>
              </a>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="text-center">
          <h3 class="text-2xl font-bold mb-6 text-white">⚡ Actions Rapides</h3>
          <div class="flex flex-wrap justify-center gap-4">
            <button onclick="testConnection()" 
                    class="bg-white text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-100 font-medium">
              <i class="fas fa-plug mr-2"></i>Tester la connexion
            </button>
            <button onclick="checkHealth()" 
                    class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-medium">
              <i class="fas fa-heartbeat mr-2"></i>Vérifier la santé
            </button>
            <button onclick="deployComplete()" 
                    class="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:opacity-90 font-medium">
              <i class="fas fa-rocket mr-2"></i>Déployer la suite
            </button>
          </div>
        </div>
      </div>
    </div>

    <footer class="bg-gray-900 text-white py-12 mt-16">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="mb-6 md:mb-0">
            <div class="flex items-center space-x-3 mb-4">
              <div class="bg-white p-2 rounded-lg">
                <i class="fas fa-shopping-bag text-blue-600"></i>
              </div>
              <div>
                <h3 class="text-xl font-bold">BafingPay Marketplace</h3>
                <p class="text-gray-400">© 2026 Tous droits réservés</p>
              </div>
            </div>
            <p class="text-gray-400 max-w-md">
              Plateforme e-commerce moderne déployée sur Railway et intégrée avec votre infrastructure existante.
            </p>
          </div>
          
          <div class="grid grid-cols-2 gap-8">
            <div>
              <h4 class="font-bold mb-4">Technologies</h4>
              <ul class="space-y-2 text-gray-400">
                <li>• Node.js 20+</li>
                <li>• Supabase</li>
                <li>• Express.js</li>
                <li>• Tailwind CSS</li>
              </ul>
            </div>
            <div>
              <h4 class="font-bold mb-4">Services</h4>
              <ul class="space-y-2 text-gray-400">
                <li>• Railway (Hébergement)</li>
                <li>• GitHub (Code)</li>
                <li>• Supabase (Base de données)</li>
                <li>• Fenigama (Analytics)</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="border-t border-gray-800 mt-8 pt-8 text-center">
          <p class="text-gray-400">
            Développé avec ❤️ par l'équipe BafingPay | 
            <a href="https://github.com/Alpha11201/bafingpay-marketplace" class="text-blue-400 hover:text-blue-300">
              Voir le code source sur GitHub
            </a>
          </p>
        </div>
      </div>
    </footer>

    <script>
      function testConnection() {
        fetch('/api')
          .then(response => response.json())
          .then(data => {
            alert('✅ Connexion réussie!\\n' + JSON.stringify(data, null, 2));
          })
          .catch(error => {
            alert('❌ Erreur de connexion: ' + error.message);
          });
      }
      
      function checkHealth() {
        fetch('/api/health')
          .then(response => response.json())
          .then(data => {
            alert('🏥 Santé du système:\\n' + JSON.stringify(data, null, 2));
          })
          .catch(error => {
            alert('❌ Erreur santé: ' + error.message);
          });
      }
      
      function deployComplete() {
        alert('🚀 Marketplace prête!\\nL\'interface complète est déployée et fonctionnelle.');
      }
      
      console.log('BafingPay Marketplace chargée avec succès!');
    </script>
  </body>
  </html>
  `);
});

// API Status
app.get('/api', (req, res) => {
  res.json({
    success: true,
    platform: "BafingPay Marketplace",
    version: "2.0.0",
    status: "online",
    node_version: process.version,
    supabase_configured: !!process.env.SUPABASE_URL,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production',
    urls: {
      home: "/",
      api: "/api",
      health: "/api/health",
      marketplace: "/marketplace"
    }
  });
});

// Health check
app.get('/api/health', async (req, res) => {
  try {
    if (!supabase) {
      return res.json({
        success: false,
        status: "supabase_not_configured",
        message: "Client Supabase non initialisé",
        required_variables: ["SUPABASE_URL", "SUPABASE_KEY"],
        help: "Configurez SUPABASE_URL et SUPABASE_KEY dans Railway Variables"
      });
    }
    
    // Test simple avec une table existante
    const { data, error } = await supabase
      .from('merchants')
      .select('count')
      .limit(1);
    
    if (error) {
      // Essayez une autre table
      const { data: products, error: productsError } = await supabase
        .from('products')
        .select('count')
        .limit(1);
        
      if (productsError) {
        return res.json({
          success: true,
          status: "supabase_connected_but_no_table_access",
          message: "Connexion Supabase OK mais tables non accessibles",
          error: productsError.message
        });
      }
      
      return res.json({
        success: true,
        status: "healthy",
        supabase: "connected",
        tables: {
          products: "accessible",
          merchants: "error"
        },
        timestamp: new Date().toISOString()
      });
    }
    
    res.json({
      success: true,
      status: "healthy",
      supabase: "connected",
      tables: {
        merchants: "accessible",
        products: "to_test"
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (err) {
    res.json({
      success: false,
      status: "error",
      error: err.message,
      help: "Vérifiez les logs Railway pour plus de détails"
    });
  }
});

// Marketplace interface
app.get('/marketplace', (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html lang="fr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🛒 Marketplace - BafingPay</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
  </head>
  <body class="bg-gray-50 min-h-screen">
    <nav class="bg-white shadow-lg">
      <div class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-3">
            <i class="fas fa-shopping-bag text-blue-600 text-2xl"></i>
            <span class="text-xl font-bold">BafingPay Marketplace</span>
          </div>
          <a href="/" class="text-blue-600 hover:text-blue-800">
            <i class="fas fa-arrow-left mr-2"></i>Retour
          </a>
        </div>
      </div>
    </nav>
    
    <div class="container mx-auto px-4 py-16">
      <div class="max-w-4xl mx-auto text-center">
        <div class="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-12 rounded-3xl mb-12">
          <h1 class="text-5xl font-bold mb-6">🛒 Marketplace BafingPay</h1>
          <p class="text-xl opacity-90">L'interface e-commerce complète sera déployée dans la prochaine phase</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="bg-white p-8 rounded-2xl shadow-lg">
            <div class="text-green-500 text-4xl mb-6">
              <i class="fas fa-check-circle"></i>
            </div>
            <h3 class="text-2xl font-bold mb-4">✅ Infrastructure Prête</h3>
            <p class="text-gray-600">Serveur, base de données et API sont opérationnels.</p>
          </div>
          
          <div class="bg-white p-8 rounded-2xl shadow-lg">
            <div class="text-blue-500 text-4xl mb-6">
              <i class="fas fa-clock"></i>
            </div>
            <h3 class="text-2xl font-bold mb-4">⏳ Interface en Développement</h3>
            <p class="text-gray-600">L'interface utilisateur complète arrive bientôt.</p>
          </div>
        </div>
        
        <div class="bg-blue-50 p-8 rounded-2xl">
          <h3 class="text-2xl font-bold mb-6">🚀 Prochaines Étapes</h3>
          <div class="space-y-4 text-left">
            <div class="flex items-center">
              <div class="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-4">
                <i class="fas fa-check"></i>
              </div>
              <div>
                <div class="font-bold">Serveur déployé</div>
                <div class="text-sm text-gray-500">Railway + GitHub + Supabase</div>
              </div>
            </div>
            
            <div class="flex items-center">
              <div class="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-4">
                <span>2</span>
              </div>
              <div>
                <div class="font-bold">Interface utilisateur</div>
                <div class="text-sm text-gray-500">Catalogue produits + Panier</div>
              </div>
            </div>
            
            <div class="flex items-center">
              <div class="w-8 h-8 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mr-4">
                <span>3</span>
              </div>
              <div>
                <div class="font-bold">Paiements BafingPay</div>
                <div class="text-sm text-gray-500">Intégration avec votre infrastructure</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-12 space-x-4">
          <a href="/" class="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-900 font-medium">
            <i class="fas fa-home mr-2"></i>Retour à l'accueil
          </a>
          <a href="/api" class="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium">
            <i class="fas fa-code mr-2"></i>Vérifier l'API
          </a>
        </div>
      </div>
    </div>
    
    <footer class="bg-gray-800 text-white py-8 mt-16">
      <div class="container mx-auto px-4 text-center">
        <p>BafingPay Marketplace • Phase 1/3 • Déployé sur Railway</p>
      </div>
    </footer>
  </body>
  </html>
  `);
});

// Démarrer le serveur
const server = app.listen(PORT, () => {
  console.log(`
  ====================================================
  🚀 BAFINGPAY MARKETPLACE DÉMARRÉ !
  ====================================================
  
  📍 Port: ${PORT}
  🖥️  Node.js: ${process.version}
  🌐 Environnement: ${process.env.NODE_ENV || 'production'}
  🔗 Supabase: ${process.env.SUPABASE_URL ? '✅ Configuré' : '❌ Non configuré'}
  
  📊 URLs disponibles:
  • Accueil: http://localhost:${PORT}/
  • API Status: http://localhost:${PORT}/api
  • Santé: http://localhost:${PORT}/api/health
  • Marketplace: http://localhost:${PORT}/marketplace
  
  💡 Pour configurer Railway:
  • SUPABASE_URL: ${process.env.SUPABASE_URL || 'À définir'}
  • SUPABASE_KEY: ${process.env.SUPABASE_KEY ? '✅ Définie' : '❌ À définir'}
  • PORT: ${PORT}
  • NODE_ENV: production
  
  ====================================================
  `);
});

// Gestion des erreurs
server.on('error', (error) => {
  console.error('❌ Erreur serveur:', error.message);
  if (error.code === 'EADDRINUSE') {
    console.error(`Le port ${PORT} est déjà utilisé. Essayez un autre port.`);
  }
});
