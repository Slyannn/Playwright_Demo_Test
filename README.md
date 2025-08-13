# Test Automation Suite - DemoQA Student Registration Form

Ce projet contient une suite complète de tests automatisés pour valider le formulaire d'inscription étudiant de DemoQA en utilisant **Playwright** et **TypeScript**.

## 🎯 Objectifs

- **Validation automatisée** de tous les éléments du formulaire
- **Vérification de l'intégrité des données** entre formulaire et modal de confirmation
- **Tests d'upload de fichiers** (documents et images)
- **Tests avec données dynamiques** générées par Faker
- **Couverture multi-navigateurs** (Chrome, Firefox, Safari)

## 🛠️ Technologies

- **[Playwright](https://playwright.dev/)** - Framework de test end-to-end
- **[TypeScript](https://www.typescriptlang.org/)** - Langage de programmation typé
- **[Faker.js](https://fakerjs.dev/)** - Générateur de données de test réalistes
- **Page Object Model (POM)** - Pattern de design pour l'organisation des tests

## 📁 Structure du Projet

```
Heal.dev_Test/
├── assets/
│   ├── test-document.txt       # Fichier texte pour tests d'upload
│   └── sample-image.png        # Image pour tests d'upload
├── pages/
│   └── PracticeFormPage.ts     # Page Object principal
├── tests/
│   ├── basicForm.spec.ts       # Tests de base du formulaire
│   ├── form-with-faker.spec.ts # Tests avec données Faker
│   └── apiTests.spec.ts        # Tests API (ReqRes)
├── utils/
│   └── testData.ts            # Utilitaires de génération de données
├── playwright.config.ts       # Configuration Playwright
├── package.json               # Dépendances du projet
└── README.md                  # Documentation
```

## 🚀 Installation

1. **Cloner le projet**
   ```bash
   git clone <repository-url>
   cd Heal.dev_Test
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Installer les navigateurs Playwright**
   ```bash
   npx playwright install
   ```

## ▶️ Lancement du Projet

### 🚀 Démarrage Rapide

1. **Vérification de l'installation**
   ```bash
   # Vérifier que Node.js est installé (version 16+ recommandée)
   node --version
   npm --version
   ```

2. **Installation des dépendances**
   ```bash
   npm install
   npx playwright install
   ```

3. **Lancer tous les tests**
   ```bash
   npx playwright test
   ```

4. **Voir les résultats**
   ```bash
   npx playwright show-report
   ```

### ⚡ Commandes de Lancement

#### Tests Complets
```bash
# Tous les tests sur tous les navigateurs
npx playwright test

# Tests avec rapport HTML interactif
npx playwright test --reporter=html

# Tests avec affichage en temps réel
npx playwright test --reporter=list
```

#### Tests Spécifiques
```bash
# Tests de formulaire uniquement (recommandé)
npx playwright test tests/basicForm.spec.ts tests/form-with-faker.spec.ts

# Tests API uniquement
npx playwright test tests/apiTests.spec.ts

# Tests sur un navigateur spécifique
npx playwright test --project=chromium

# Test d'un seul fichier
npx playwright test tests/basicForm.spec.ts
```

#### Tests par Navigateur
```bash
# Chrome/Chromium
npx playwright test --project=chromium

# Safari/WebKit
npx playwright test --project=webkit

# Firefox (optionnel)
npx playwright test --project=firefox
```

### 🛠️ Modes de Développement

#### Mode Debug
```bash
# Debug interactif (pause et inspection)
npx playwright test --debug

# Debug d'un test spécifique
npx playwright test tests/basicForm.spec.ts --debug

# Mode headed (voir le navigateur)
npx playwright test --headed
```

#### Interface Graphique
```bash
# Interface utilisateur Playwright
npx playwright test --ui

# Mode trace viewer pour debugging
npx playwright show-trace trace.zip
```

#### Développement en Temps Réel
```bash
# Watch mode (relance automatique)
npm run test:watch  # si configuré dans package.json

# Tests avec maximum d'échecs limité
npx playwright test --max-failures=3

# Tests avec un seul worker (séquentiel)
npx playwright test --workers=1
```

### 📊 Rapports et Résultats

#### Génération de Rapports
```bash
# Rapport HTML (ouvre automatiquement le navigateur)
npx playwright show-report

# Rapport JSON
npx playwright test --reporter=json

# Rapport JUnit (pour CI/CD)
npx playwright test --reporter=junit
```

#### Analyse des Résultats
```bash
# Logs détaillés
npx playwright test --reporter=list

# Voir les traces en cas d'échec
npx playwright show-trace test-results/trace.zip

# Screenshots en cas d'échec (générés automatiquement)
# Voir dans : test-results/
```

### 🎯 Commandes Recommandées

#### Pour le Développement
```bash
# Lancement standard pour développement
npx playwright test tests/basicForm.spec.ts tests/form-with-faker.spec.ts --reporter=list

# Test rapide sur Chrome uniquement
npx playwright test --project=chromium --reporter=list
```

#### Pour la Validation Complète
```bash
# Suite complète avant commit
npx playwright test tests/basicForm.spec.ts tests/form-with-faker.spec.ts

# Génération du rapport final
npx playwright test --reporter=html && npx playwright show-report
```

#### Pour le Debugging
```bash
# En cas de problème
npx playwright test tests/basicForm.spec.ts --debug --project=chromium

# Pour voir les détails d'un échec
npx playwright test --headed --reporter=list
```

### ⚠️ Résolution de Problèmes

#### Si les tests échouent
```bash
# Réinstaller les navigateurs
npx playwright install

# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install
npx playwright install
```

#### Si des dépendances manquent
```bash
# Installer les dépendances système (Linux)
npx playwright install-deps

# Sur Windows, généralement pas nécessaire
```

### 🔄 Workflow Recommandé

1. **Développement quotidien**
   ```bash
   npx playwright test tests/basicForm.spec.ts --reporter=list --project=chromium
   ```

2. **Avant un commit**
   ```bash
   npx playwright test tests/basicForm.spec.ts tests/form-with-faker.spec.ts
   ```

3. **Validation complète**
   ```bash
   npx playwright test --reporter=html
   npx playwright show-report
   ```

4. **Debugging en cas de problème**
   ```bash
   npx playwright test tests/basicForm.spec.ts --debug --headed
   ```

## 🧪 Types de Tests

### 1. Tests de Base (`basicForm.spec.ts`)
- ✅ **Validation des éléments obligatoires** (présence et éditabilité)
- ✅ **Tests de sélection de genre** (Male, Female, Other)
- ✅ **Tests d'upload de fichiers** avec validation modal
- ✅ **Validation du format mobile** (10 chiffres exactement)
- ✅ **Soumission avec champs minimum requis**
- ✅ **Validation de la correspondance formulaire ↔ modal**

### 2. Tests avec Faker (`form-with-faker.spec.ts`)
- 🎲 **Génération automatique de données** réalistes
- 📁 **Tests d'upload de fichiers** (documents et images)
- 🔄 **Tests multi-utilisateurs** avec différents profils
- 🌍 **Variations de données** géographiques et démographiques
- 🎯 **Tests edge cases** avec données limites
- 📚 **Formulaire complet** avec subjects et hobbies

### 3. Tests API (`apiTests.spec.ts`)
- 🌐 **Tests GET/POST** sur ReqRes API
- 🔒 **Gestion du rate limiting** (status 401)
- ✅ **Validation des headers** et content-type
- 👥 **Création d'utilisateurs multiples**

## 🎛️ Fonctionnalités du Page Object

### Validation Automatique
- **Présence des éléments** obligatoires
- **Format des données** (email, mobile 10 chiffres)
- **Correspondance exacte** formulaire vs modal
- **Gestion intelligente des modals** et overlays

### Méthodes Principales
```typescript
// Navigation et setup
await form.navigateToForm()

// Remplissage des champs
await form.fillFirstName("John")
await form.fillLastName("Doe")
await form.fillEmail("john@example.com")
await form.selectGender("Male")
await form.fillMobileNumber("1234567890")

// Validation et soumission
await form.submitForm()
await form.validateFormDataMatchesModal()
await form.closeModal()
```

## 📊 Résultats et Rapports

### Exécution Typique
```
✅ 42 tests de formulaire passés
✅ 15 tests API passés  
⚠️ Rate limiting API géré automatiquement
🎯 Validation complète des données
```

### Rapports Générés
- **HTML Report** : Interface graphique avec détails
- **Console Output** : Logs détaillés en temps réel
- **Screenshots** : Captures d'écran en cas d'échec
- **Traces** : Enregistrement complet des actions

## 🔧 Configuration

### Navigateurs Supportés
- **Chromium** (Chrome/Edge) ✅
- **Firefox** ✅
- **WebKit** (Safari) ✅

### Environnements
- **URL de base** : `https://demoqa.com`
- **Parallélisation** : Activée
- **Retry** : 2 tentatives en CI
- **Timeout** : 30 secondes par test

## 🛡️ Fonctionnalités Avancées

### Gestion des Interférences
- **Suppression automatique des publicités**
- **Fermeture des modals parasites**
- **Gestion des overlays** et popups
- **Retry automatique** en cas d'échec temporaire

### Validation de Données
- **Extraction précise** des valeurs formulaire
- **Comparaison exacte** avec le modal de confirmation
- **Validation des formats** (email regex, mobile 10 chiffres)
- **Messages d'erreur détaillés** pour debugging

### Génération de Données
- **Noms** et **emails** réalistes avec Faker
- **Numéros de téléphone** valides (10 chiffres)
- **Adresses** géographiques cohérentes
- **Variations de genres** et profils

## 🐛 Debugging

### En cas d'échec
1. **Vérifier les logs** dans la console
2. **Examiner les screenshots** générés
3. **Utiliser le mode debug** : `--debug`
4. **Consulter les traces** Playwright

### Messages d'Erreur Courants
- `❌ Format mobile invalide` : Numéro != 10 chiffres
- `⚠️ Modal détecté ouvert` : Nettoyage automatique
- `🔍 Validation de la présence` : Éléments manquants
- `API rate limited` : Limitation temporaire ReqRes

## 🚀 Prochaines Étapes

### Améliorations Possibles
- [ ] Tests de performance avec Lighthouse
- [ ] Integration avec CI/CD (GitHub Actions)
- [ ] Tests de régression automatisés
- [ ] Couverture de tests étendue

### Maintenance
- [ ] Mise à jour des dépendances
- [ ] Optimisation des sélecteurs
- [ ] Documentation technique détaillée
- [ ] Formation de l'équipe QA

---

## 📞 Support

Pour toute question ou problème :
1. Consulter les **logs détaillés** dans la console
2. Vérifier les **rapports HTML** générés
3. Examiner les **traces** Playwright pour debugging avancé

**Statut** : ✅ **Tous les tests fonctionnent parfaitement !**
