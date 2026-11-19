import React, { useContext, useRef, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { CameraIcon, BarChart2Icon, BookOpenIcon, FlameIcon, UsersIcon, ZapIcon, UploadIcon } from '../components/icons';
import { generateRecipesFromImage } from '../services/geminiService';
import { Recipe } from '../types';
import Loader from '../components/Loader';

type ViewState = 'initial' | 'loading' | 'results';

const HomePage: React.FC = () => {
  const { setActivePage, apiKey, recipes, setRecipes, preferences } = useContext(AppContext);
  const [viewState, setViewState] = useState<ViewState>('initial');
  const [generatedRecipes, setGeneratedRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setViewState('loading');
    setError(null);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      try {
        const imageUrl = reader.result as string;
        const base64Image = imageUrl.split(',')[1];
        const newRecipes = await generateRecipesFromImage(apiKey, base64Image, file.type, preferences);
        
        setGeneratedRecipes(newRecipes);
        setRecipes(prev => [...newRecipes, ...prev]);
        setViewState('results');
      } catch (err) {
        console.error(err);
        setError('Falha ao gerar receitas. Verifique sua chave de API e tente novamente.');
        setViewState('initial');
      }
    };
    reader.onerror = () => {
      setError('Falha ao ler o arquivo de imagem.');
      setViewState('initial');
    };
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleBackToHome = () => {
    setViewState('initial');
    setGeneratedRecipes([]);
    setError(null);
  };

  const renderContent = () => {
    switch (viewState) {
      case 'loading':
        return (
          <div className="bg-gray-50 p-6">
            <div className="bg-white p-6 rounded-2xl shadow-md -mt-16">
              <Loader message="Analisando ingredientes e gerando receitas..." />
            </div>
          </div>
        );
      case 'results':
        return (
          <div className="bg-gray-50 p-6">
            <div className="bg-white p-6 rounded-2xl shadow-md -mt-16">
              <button onClick={handleBackToHome} className="text-primary font-semibold mb-4">&larr; Voltar</button>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Receitas Geradas</h2>
              <p className="text-gray-500 mb-4">Suas receitas foram salvas no histórico!</p>
              <button
                onClick={() => setActivePage('recipes')}
                className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-dark transition-colors"
              >
                Ver Todas as Receitas
              </button>
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-gray-50 p-4 min-h-screen">
             {/* Card principal de captura */}
             <div className="bg-white p-6 rounded-2xl shadow-lg -mt-12 mb-6">
               <div className="flex flex-col items-center text-center">
                 <div className="p-5 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full mb-4 shadow-sm">
                   <CameraIcon className="w-10 h-10 text-primary" />
                 </div>
                 <h2 className="text-2xl font-bold text-gray-800 mb-2">Fotografar Geladeira</h2>
                 <p className="text-gray-600 mb-6 text-sm max-w-sm leading-relaxed">
                   Tire uma foto dos seus ingredientes e receba receitas personalizadas com IA
                 </p>
                 {error && (
                   <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm w-full">
                     {error}
                   </div>
                 )}
                 <div className="w-full space-y-3">
                   <button
                     onClick={handleCameraClick}
                     className="w-full bg-primary text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center space-x-3 hover:bg-primary-dark transition-all duration-200 shadow-md hover:shadow-lg"
                   >
                     <CameraIcon className="w-5 h-5" />
                     <span>Fotografar Geladeira</span>
                   </button>
                   <button 
                     onClick={handleCameraClick} 
                     className="w-full text-primary font-semibold py-3 px-6 border-2 border-primary rounded-xl flex items-center justify-center space-x-2 hover:bg-primary hover:text-white transition-all duration-200"
                   >
                     <UploadIcon className="w-4 h-4" />
                     <span>Enviar Foto</span>
                   </button>
                 </div>
               </div>
             </div>
             
             {/* Seção de tipos de receita */}
             <div className="mb-6">
               <h3 className="font-bold text-gray-800 text-lg mb-4 px-1">Tipos de Receita</h3>
               <div className="space-y-3">
                 <div className="flex items-center bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200 shadow-sm">
                   <div className="p-2 bg-white rounded-lg shadow-sm mr-4">
                     <FlameIcon className="w-6 h-6 text-orange-500"/>
                   </div>
                   <div className="flex-1">
                     <h4 className="font-semibold text-gray-800">Express</h4>
                     <p className="text-sm text-gray-600">Receitas rápidas para o dia a dia</p>
                   </div>
                   <span className="text-sm font-bold text-orange-600 bg-white px-3 py-1 rounded-full">15 min</span>
                 </div>
                 <div className="flex items-center bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200 shadow-sm">
                   <div className="p-2 bg-white rounded-lg shadow-sm mr-4">
                     <UsersIcon className="w-6 h-6 text-blue-500"/>
                   </div>
                   <div className="flex-1">
                     <h4 className="font-semibold text-gray-800">Balanceada</h4>
                     <p className="text-sm text-gray-600">Nutricionalmente equilibradas</p>
                   </div>
                   <span className="text-sm font-bold text-blue-600 bg-white px-3 py-1 rounded-full">30 min</span>
                 </div>
                 <div className="flex items-center bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200 shadow-sm">
                   <div className="p-2 bg-white rounded-lg shadow-sm mr-4">
                     <ZapIcon className="w-6 h-6 text-green-500"/>
                   </div>
                   <div className="flex-1">
                     <h4 className="font-semibold text-gray-800">Performance</h4>
                     <p className="text-sm text-gray-600">Foco em alta proteína</p>
                   </div>
                   <span className="text-sm font-bold text-green-600 bg-white px-3 py-1 rounded-full">Proteína+</span>
                 </div>
               </div>
             </div>

             {/* Cards de navegação */}
             <div className="grid grid-cols-2 gap-4">
               <div
                 onClick={() => setActivePage('analysis')}
                 className="bg-white p-5 rounded-xl shadow-md flex flex-col items-center text-center cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200 border border-gray-100"
               >
                 <div className="p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-full mb-3">
                   <BarChart2Icon className="w-7 h-7 text-purple-600" />
                 </div>
                 <h4 className="font-bold text-gray-800 mb-1">Analisar Prato</h4>
                 <p className="text-xs text-gray-500 leading-relaxed">Foto → Health Score</p>
               </div>
               <div
                 onClick={() => setActivePage('recipes')}
                 className="bg-white p-5 rounded-xl shadow-md flex flex-col items-center text-center cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200 border border-gray-100"
               >
                 <div className="p-3 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-full mb-3">
                   <BookOpenIcon className="w-7 h-7 text-indigo-600" />
                 </div>
                 <h4 className="font-bold text-gray-800 mb-1">Histórico</h4>
                 <p className="text-xs text-gray-500 leading-relaxed">Receitas salvas</p>
               </div>
             </div>
           </div>
        );
    }
  };

  return (
    <div className="bg-gradient-to-br from-primary to-primary-dark min-h-screen">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <header className="p-6 text-white pb-16">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-1">ReceitIA</h1>
            <p className="text-blue-100 text-sm font-medium">IA para suas receitas</p>
          </div>
          <div className="w-14 h-14 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <FlameIcon className="w-7 h-7 text-white" />
          </div>
        </div>
      </header>

      {renderContent()}
    </div>
  );
};

export default HomePage;