# Système d'Authentification - BudgetFlow Frontend

## 🚀 Fonctionnalités Implémentées

### ✅ Authentification Complète
- **Connexion** avec email et mot de passe
- **Enregistrement** avec validation des champs
- **Déconnexion** sécurisée
- **Gestion automatique des tokens** (access + refresh)
- **Persistance** des données dans localStorage
- **Redirection automatique** selon l'état d'authentification

### 🔐 Sécurité
- **Refresh tokens** automatiques via interceptors axios
- **Cookies httpOnly** pour les refresh tokens
- **Validation côté client** des formulaires
- **Gestion d'erreurs** robuste
- **Nettoyage automatique** des tokens expirés

## 📁 Structure des Fichiers

```
FrontEnd/src/
├── Auth/
│   ├── LoginPage.tsx          # Page de connexion
│   └── RegisterPage.tsx       # Page d'enregistrement
├── Redux/
│   ├── slices/
│   │   └── authSlice.ts       # État d'authentification Redux
│   └── Store.tsx              # Configuration du store
├── hooks/
│   └── useAuth.ts             # Hook personnalisé pour l'auth
├── services/
│   └── authService.ts         # Service axios avec interceptors
└── Routes/
    ├── index.tsx              # Configuration des routes
    └── ProtectedRoutes.tsx    # Protection des routes privées
```

## 🛠️ Utilisation

### 1. Hook useAuth
```typescript
import { useAuth } from '../hooks/useAuth';

const MyComponent = () => {
  const { 
    user, 
    isAuthenticated, 
    loading, 
    error, 
    login, 
    register, 
    logout, 
    clearAuthError 
  } = useAuth();

  // Utiliser les fonctions d'authentification
  const handleLogin = async () => {
    const result = await login({ email, password });
    if (result.success) {
      // Redirection automatique
    }
  };
};
```

### 2. Service API
```typescript
import apiClient from '../services/authService';

// Toutes les requêtes utilisent automatiquement les tokens
const response = await apiClient.get('/api/protected-route');
```

### 3. Protection des Routes
```typescript
// Les routes protégées redirigent automatiquement vers /login
// si l'utilisateur n'est pas authentifié
<Route path="/dashboard" element={<ProtectedRoutes />}>
  <Route index element={<Dashboard />} />
</Route>
```

## 🔄 Flux d'Authentification

### Connexion
1. Utilisateur saisit email/password
2. Validation côté client
3. Appel API `/api/auth/login`
4. Stockage du token dans localStorage
5. Mise à jour du state Redux
6. Redirection vers le dashboard

### Refresh Token
1. Interceptor détecte une erreur 401
2. Tentative de refresh automatique
3. Mise à jour du token
4. Retry de la requête originale
5. Si échec : déconnexion automatique

### Déconnexion
1. Appel API `/api/auth/logout`
2. Suppression des cookies
3. Nettoyage du localStorage
4. Reset du state Redux
5. Redirection vers /login

## 🎨 Interface Utilisateur

### Pages d'Authentification
- **Design moderne** avec Tailwind CSS
- **Validation en temps réel** des champs
- **Messages d'erreur** clairs et contextuels
- **États de chargement** avec spinners
- **Responsive design** pour mobile/desktop

### Navigation
- **Header avec informations utilisateur**
- **Bouton de déconnexion** accessible
- **Redirection automatique** selon l'état

## ⚙️ Configuration

### Variables d'Environnement
```env
VITE_API_URL=http://localhost:3000
```

### Redux Store
```typescript
// L'état d'authentification est automatiquement persisté
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}
```

## 🚦 États de l'Application

### Authentifié
- ✅ Accès aux routes protégées
- ✅ Token valide dans les requêtes
- ✅ Refresh automatique des tokens
- ✅ Données utilisateur disponibles

### Non Authentifié
- ❌ Redirection vers /login
- ❌ Pas d'accès aux routes protégées
- ❌ Tokens nettoyés

### En Chargement
- ⏳ Spinners d'attente
- ⏳ Désactivation des boutons
- ⏳ Messages de progression

## 🔧 Personnalisation

### Ajouter des Champs de Validation
```typescript
// Dans LoginPage.tsx ou RegisterPage.tsx
const validateForm = () => {
  const errors: Record<string, string> = {};
  
  // Ajouter tes validations personnalisées
  if (formData.customField && !isValid(formData.customField)) {
    errors.customField = 'Message d\'erreur personnalisé';
  }
  
  return Object.keys(errors).length === 0;
};
```

### Modifier les Messages d'Erreur
```typescript
// Dans authSlice.ts
return rejectWithValue(
  error.response?.data?.message || 'Message d\'erreur personnalisé'
);
```

## 🐛 Débogage

### Console Logs
- Les erreurs d'authentification sont loggées dans la console
- Les tentatives de refresh token sont visibles
- Les redirections sont tracées

### LocalStorage
- `token`: Access token JWT
- `user`: Informations utilisateur sérialisées

### Redux DevTools
- État d'authentification visible
- Actions dispatchées tracées
- Historique des changements d'état

## 🚀 Prochaines Étapes

1. **Tests unitaires** pour les composants d'auth
2. **Tests d'intégration** pour les flux complets
3. **Gestion des rôles** utilisateur
4. **OAuth** (Google, Facebook, etc.)
5. **2FA** (authentification à deux facteurs)
6. **Gestion des sessions** multiples
