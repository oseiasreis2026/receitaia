
import React, { useState, useContext, useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import { Recipe, RecipeCategory } from '../types';
import RecipeCard from '../components/RecipeCard';
import { FlameIcon, UsersIcon, ZapIcon, CookingPotIcon } from '../components/icons';

type ViewState = 'detail' | 'list';
type FilterType = 'Todas' | RecipeCategory;

const RecipeDetailPage: React.FC<{ recipe: Recipe; onBack: () => void }> = ({ recipe, onBack }) => {
    return (
        <div className="p-4 animate-fade-in">
            <button onClick={onBack} className="text-primary font-semibold mb-4">&larr; Voltar para receitas</button>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <h2 className="text-2xl font-bold mb-2">{recipe.name}</h2>
                <div className="flex items-center space-x-2 mb-4">
                    <span className="text-sm font-semibold">{recipe.category} &bull; {recipe.difficulty} &bull; {recipe.prepTime} min</span>
                </div>
                
                <h3 className="font-bold text-lg mt-6 mb-2">Ingredientes</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {recipe.ingredients.map((ing, i) => <li key={i}>{ing.quantity} {ing.name}</li>)}
                </ul>

                <h3 className="font-bold text-lg mt-6 mb-2">Modo de Preparo</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                    {recipe.steps.map((step, i) => <li key={i}>{step}</li>)}
                </ol>

                {recipe.substitutions && recipe.substitutions.length > 0 && (
                    <>
                        <h3 className="font-bold text-lg mt-6 mb-2">Sugestões de Substituição</h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-700">
                            {recipe.substitutions.map((sub, i) => <li key={i}><strong>{sub.original}:</strong> {sub.substitute}</li>)}
                        </ul>
                    </>
                )}

                 {recipe.allergens && recipe.allergens.length > 0 && (
                    <>
                        <h3 className="font-bold text-lg mt-6 mb-2 text-red-600">Alérgenos</h3>
                        <p className="text-red-500">{recipe.allergens.join(', ')}</p>
                    </>
                )}
            </div>
        </div>
    );
};


const RecipesPage: React.FC = () => {
    const { recipes: historyRecipes } = useContext(AppContext);
    const [viewState, setViewState] = useState<ViewState>('list');
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
    const [activeFilter, setActiveFilter] = useState<FilterType>('Todas');


    
    const handleViewDetails = (recipe: Recipe) => {
        setSelectedRecipe(recipe);
        setViewState('detail');
    };

    const handleBackToList = () => {
        setSelectedRecipe(null);
        setViewState('list');
    }

    const filteredHistory = useMemo(() => {
        if (activeFilter === 'Todas') return historyRecipes;
        return historyRecipes.filter(r => r.category === activeFilter);
    }, [activeFilter, historyRecipes]);


    const renderContent = () => {
        switch (viewState) {
            case 'list':
                return (
                    <div className="p-4">
                        <div className="mb-6">
                            {historyRecipes.length === 0 ? (
                                <div className="bg-white p-6 rounded-2xl shadow-md text-center">
                                    <div className="p-4 bg-orange-100 rounded-full mb-4 inline-block">
                                        <CookingPotIcon className="w-8 h-8 text-orange-500" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Nenhuma receita salva</h3>
                                    <p className="text-gray-500 text-sm">Suas receitas geradas aparecerão aqui após você fotografar seus ingredientes na página inicial.</p>
                                </div>
                            ) : (
                                filteredHistory.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} onClick={() => handleViewDetails(recipe)} />)
                            )}
                        </div>
                    </div>
                );
            case 'detail':
                return selectedRecipe ? (
                    <RecipeDetailPage recipe={selectedRecipe} onBack={handleBackToList} />
                ) : null;
        }
    };
    
    const filters: FilterType[] = ['Todas', 'Express', 'Balanceada', 'Performance'];

    return (
        <div>
            <header className="sticky top-0 bg-primary text-white z-10 px-4 py-3 sm:py-4">
                <div className="max-w-md mx-auto">
                    <h1 className="text-2xl font-bold text-center mb-3 sm:mb-4">Receitas</h1>
                    {(viewState === 'list' && historyRecipes.length > 0) && (
                        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
                            {filters.map(f => (
                                <button
                                    key={f}
                                    onClick={() => setActiveFilter(f)}
                                    className={`px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 whitespace-nowrap min-w-0 flex-shrink-0 ${
                                        activeFilter === f 
                                            ? 'bg-white text-primary shadow-md scale-105' 
                                            : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                                    }`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </header>

            {renderContent()}
        </div>
    );
};

export default RecipesPage;
