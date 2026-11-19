# 🍳 ReceitIA - IA para suas receitas

Uma aplicação React moderna que utiliza inteligência artificial para gerar receitas personalizadas e analisar pratos através de imagens.

## 📱 Sobre o Projeto

O **ReceitIA** é um assistente culinário inteligente que combina a praticidade do React com o poder da IA do Google Gemini. Tire uma foto da sua geladeira e receba receitas personalizadas, ou fotografe um prato para obter análise nutricional completa.

## ✨ Funcionalidades

### 🔍 Geração de Receitas por IA
- 📸 **Upload de foto da geladeira**: Identifica ingredientes automaticamente
- 🍽️ **3 tipos de receitas**:
  - **Express**: Receitas rápidas (até 15 min)
  - **Balanceada**: Nutricionalmente equilibradas
  - **Performance**: Foco em alta proteína
- 🔄 **Filtros por categoria**
- 📚 **Histórico de receitas salvas**

### 📊 Análise Nutricional
- 📷 **Análise de pratos por foto**
- 🎯 **Health Score visual** (0-100)
- 📈 **Informações nutricionais detalhadas**
- 📋 **Histórico de análises**
- 🏷️ **Classificação do nível de processamento**

### ⚙️ Personalização
- 🌱 **Preferências alimentares** (vegetariano, baixo sódio, alta proteína)
- 🔑 **Configuração da API Key do Gemini**
- 📊 **Estatísticas pessoais**

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 19.1.1 + TypeScript
- **Build Tool**: Vite 6.2.0
- **Estilização**: Tailwind CSS
- **IA**: Google Gemini AI (@google/genai)
- **Gerenciamento de Estado**: React Context API
- **Persistência**: Local Storage
- **Ícones**: SVG customizados

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- Gemini API Key ([obtenha aqui](https://aistudio.google.com/app/apikey))

### Configuração da API Key

**⚠️ IMPORTANTE**: Para usar a aplicação, você deve configurar sua Gemini API Key diretamente no código:

1. **Arquivo**: `context/AppContext.tsx`
2. **Linha**: 24
3. **Altere a constante**:
   ```typescript
   const apiKey = 'SUA_API_KEY_AQUI';

## 🚀 Instalação

1. **Instale as dependências**
```bash
npm install
```
2. **Execute o projeto**
```bash
npm run dev
```

4. **Acesse a aplicação**
   - Abra seu navegador em `http://localhost:5173`
   - A aplicação já vem configurada com IA integrada, pronta para uso

## 📖 Como Usar

### Gerando Receitas
1. Acesse a aba "Receitas"
2. Clique em "Fotografar Geladeira"
3. Faça upload de uma foto dos seus ingredientes
4. Aguarde a IA processar e gerar 3 receitas personalizadas
5. Explore os detalhes, ingredientes e modo de preparo

### Analisando Pratos
1. Acesse a aba "Análises"
2. Clique em "Analisar Prato"
3. Faça upload de uma foto do seu prato
4. Visualize o Health Score e informações nutricionais

### Configurando Preferências
1. Acesse a aba "Perfil"
2. Configure suas preferências alimentares
3. Acompanhe suas estatísticas
4. A IA já está configurada e pronta para uso

## 📁 Estrutura do Projeto

```
ReceitIA-main/
├── components/          # Componentes reutilizáveis
│   ├── Badge.tsx
│   ├── BottomNav.tsx
│   ├── HealthScoreCircle.tsx
│   ├── Layout.tsx
│   ├── Loader.tsx
│   ├── RecipeCard.tsx
│   ├── ToggleSwitch.tsx
│   └── icons.tsx
├── context/             # Gerenciamento de estado
│   └── AppContext.tsx
├── hooks/               # Hooks customizados
│   └── useLocalStorage.ts
├── pages/               # Páginas da aplicação
│   ├── AnalysisPage.tsx
│   ├── HomePage.tsx
│   ├── ProfilePage.tsx
│   └── RecipesPage.tsx
├── services/            # Integração com APIs
│   └── geminiService.ts
├── App.tsx              # Componente principal
├── constants.ts         # Dados mock e constantes
├── types.ts             # Definições TypeScript
└── vite.config.ts       # Configuração do Vite
```

## 🎨 Design System

### Cores
- **Primary**: Azul (#2563EB)
- **Secondary**: Cinza claro (#F3F4F6)
- **Accent Orange**: Laranja (#EA580C)
- **Accent Green**: Verde (#16A34A)

### Categorias de Receitas
- **Express**: Laranja (receitas rápidas)
- **Balanceada**: Azul (nutricionalmente equilibradas)
- **Performance**: Verde (alta proteína)

## 🔧 Scripts Disponíveis

```bash
npm run dev      # Inicia o servidor de desenvolvimento
npm run build    # Gera build de produção
npm run preview  # Visualiza o build de produção
```

---

**Desenvolvido com ❤️ Club do Software**