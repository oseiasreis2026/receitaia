
import { Recipe, Analysis } from './types';

export const MOCK_RECIPES: Recipe[] = [
  {
    id: '1',
    name: 'Omelete EXPRESS com Queijo e Legumes',
    category: 'Express',
    difficulty: 'Fácil',
    prepTime: 10,
    servings: 1,
    healthScore: 61,
    nutrients: { kcal: 250, protein: 19, carbs: 4, fat: 18 },
    ingredients: [
      { name: 'Ovos', quantity: '3 unidades' },
      { name: 'Queijo fatiado', quantity: '50g' },
      { name: 'Cenoura ralada', quantity: '30g' },
      { name: 'Folhas verdes', quantity: '20g' },
      { name: 'Manteiga', quantity: '5g' },
      { name: 'Sal e pimenta', quantity: 'a gosto' },
    ],
    steps: [
      'Bata os ovos em uma tigela com sal e pimenta.',
      'Aqueça a manteiga em uma frigideira em fogo médio.',
      'Despeje os ovos na frigideira e cozinhe por 2 minutos.',
      'Adicione o queijo, a cenoura e as folhas verdes em metade do omelete.',
      'Dobre a outra metade por cima e cozinhe por mais 1 minuto.',
      'Sirva imediatamente.',
    ],
    substitutions: [
        { original: 'Manteiga', substitute: 'Azeite de oliva' },
        { original: 'Queijo fatiado', substitute: 'Queijo cottage ou tofu' }
    ],
    allergens: ['Ovos', 'Leite'],
  },
  {
    id: '2',
    name: 'Salada Balanceada com Proteína',
    category: 'Balanceada',
    difficulty: 'Fácil',
    prepTime: 15,
    servings: 2,
    healthScore: 78,
    nutrients: { kcal: 320, protein: 22, carbs: 12, fat: 18 },
    ingredients: [
      { name: 'Folhas verdes', quantity: '120g' },
      { name: 'Pepino em rodelas', quantity: '100g' },
      { name: 'Cenoura em tiras', quantity: '80g' },
      { name: 'Ovos cozidos', quantity: '2 unidades' },
      { name: 'Queijo em cubos', quantity: '80g' },
      { name: 'Azeite e limão', quantity: 'para temperar' },
    ],
    steps: [
      'Lave e seque as folhas verdes.',
      'Em uma saladeira, misture as folhas, o pepino e a cenoura.',
      'Adicione os ovos cozidos cortados e o queijo em cubos.',
      'Tempere com azeite, limão, sal e pimenta a gosto.',
      'Misture delicadamente e sirva.',
    ],
    substitutions: [
        { original: 'Ovos cozidos', substitute: 'Frango desfiado ou grão de bico' },
        { original: 'Queijo', substitute: 'Tofu' }
    ],
    allergens: ['Ovos', 'Leite'],
  },
  {
    id: '3',
    name: 'Bowl Performance High-Protein',
    category: 'Performance',
    difficulty: 'Médio',
    prepTime: 20,
    servings: 1,
    healthScore: 85,
    nutrients: { kcal: 420, protein: 35, carbs: 8, fat: 28 },
    ingredients: [
      { name: 'Ovos mexidos', quantity: '4 unidades' },
      { name: 'Queijo cottage', quantity: '100g' },
      { name: 'Abacate fatiado', quantity: '1/2 unidade' },
      { name: 'Sementes de girassol', quantity: '1 colher de sopa' },
      { name: 'Azeite', quantity: '1 fio' },
    ],
    steps: [
      'Prepare os ovos mexidos em uma frigideira com um fio de azeite.',
      'Monte o bowl: coloque os ovos mexidos de um lado e o queijo cottage do outro.',
      'Adicione as fatias de abacate.',
      'Salpique as sementes de girassol por cima.',
      'Tempere com sal e pimenta se desejar.',
    ],
    substitutions: [
        { original: 'Queijo cottage', substitute: 'Iogurte grego natural' },
        { original: 'Sementes de girassol', substitute: 'Nozes ou amêndoas' }
    ],
    allergens: ['Ovos', 'Leite'],
  },
];

export const MOCK_ANALYSES: Analysis[] = [
  {
    id: 'a1',
    name: 'Prato Executivo',
    date: '14/01/2024',
    imageUrl: 'https://picsum.photos/300/200',
    healthScore: 72,
    nutrients: { kcal: 650, protein: 28, carbs: 45, fat: 32 },
    processingLevel: 'Minimamente processado',
  },
  {
    id: 'a2',
    name: 'Sanduíche Natural',
    date: '13/01/2024',
    imageUrl: 'https://picsum.photos/300/200',
    healthScore: 58,
    nutrients: { kcal: 420, protein: 18, carbs: 38, fat: 22 },
    processingLevel: 'Processado',
  },
];
