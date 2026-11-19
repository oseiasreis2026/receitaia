
import React from 'react';
import { Recipe, RecipeCategory } from '../types';
import HealthScoreCircle from './HealthScoreCircle';
import Badge from './Badge';
import { ClockIcon, UtensilsCrossedIcon } from './icons';

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
}

const categoryStyles: Record<RecipeCategory, { bg: string; text: string; border: string }> = {
    Express: { bg: 'bg-orange-50', text: 'text-accent-orange', border: 'border-orange-200'},
    Balanceada: { bg: 'bg-blue-50', text: 'text-primary-light', border: 'border-blue-200'},
    Performance: { bg: 'bg-green-50', text: 'text-accent-green', border: 'border-green-200'},
};

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick }) => {
  const styles = categoryStyles[recipe.category];

  return (
    <div
      onClick={onClick}
      className={`bg-white p-4 rounded-xl border ${styles.border} shadow-sm cursor-pointer hover:shadow-md transition-shadow duration-200 mb-4`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-800 leading-tight">{recipe.name}</h3>
          <div className="flex items-center space-x-2 mt-2">
            <Badge color={recipe.category}>{recipe.category}</Badge>
            <Badge>{recipe.difficulty}</Badge>
          </div>
        </div>
        <HealthScoreCircle score={recipe.healthScore} size={50} strokeWidth={5} />
      </div>
      <div className="flex items-center text-sm text-gray-500 mt-3 space-x-4">
        <div className="flex items-center">
            <ClockIcon className="w-4 h-4 mr-1"/>
            <span>{recipe.prepTime} min</span>
        </div>
        <div className="flex items-center">
            <UtensilsCrossedIcon className="w-4 h-4 mr-1"/>
            <span>{recipe.servings} porç{recipe.servings > 1 ? 'ões' : 'ão'}</span>
        </div>
      </div>
      <div className={`mt-4 pt-4 border-t ${styles.border} grid grid-cols-4 text-center`}>
        <div>
          <p className="text-sm text-gray-500">kcal</p>
          <p className="font-bold text-gray-800">{recipe.nutrients.kcal}</p>
        </div>
        <div>
          <p className="text-sm text-blue-500">proteína</p>
          <p className="font-bold text-blue-500">{recipe.nutrients.protein}g</p>
        </div>
        <div>
          <p className="text-sm text-green-500">carbs</p>
          <p className="font-bold text-green-500">{recipe.nutrients.carbs}g</p>
        </div>
        <div>
          <p className="text-sm text-red-500">gordura</p>
          <p className="font-bold text-red-500">{recipe.nutrients.fat}g</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
