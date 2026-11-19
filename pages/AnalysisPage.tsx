
import React, { useState, useRef, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { analyzeDishFromImage } from '../services/geminiService';
import { Analysis } from '../types';
import Loader from '../components/Loader';
import HealthScoreCircle from '../components/HealthScoreCircle';
import { CameraIcon, UploadIcon, BarChart2Icon } from '../components/icons';

const AnalysisResult: React.FC<{ analysis: Analysis; onNew: () => void }> = ({ analysis, onNew }) => {
    return (
        <div className="p-4 animate-fade-in">
            <h2 className="text-2xl font-bold text-center mb-4">Análise do Prato</h2>
            <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
                <img src={analysis.imageUrl} alt={analysis.name} className="rounded-lg w-full h-48 object-cover mb-4" />
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">{analysis.name}</h3>
                    <HealthScoreCircle score={analysis.healthScore} size={60} />
                </div>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span>Nível de Processamento:</span> <span className="font-semibold">{analysis.processingLevel}</span></div>
                    <div className="flex justify-between"><span>Calorias:</span> <span className="font-semibold">{analysis.nutrients.kcal} kcal</span></div>
                    <div className="flex justify-between"><span>Proteínas:</span> <span className="font-semibold">{analysis.nutrients.protein}g</span></div>
                    <div className="flex justify-between"><span>Carboidratos:</span> <span className="font-semibold">{analysis.nutrients.carbs}g</span></div>
                    <div className="flex justify-between"><span>Gorduras:</span> <span className="font-semibold">{analysis.nutrients.fat}g</span></div>
                </div>
            </div>
            <button onClick={onNew} className="w-full mt-6 bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-dark transition-colors">Analisar Outro Prato</button>
        </div>
    );
};

const AnalysisCard: React.FC<{ analysis: Analysis }> = ({ analysis }) => (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center space-x-4">
        <div className="flex-1">
            <div className="flex justify-between items-start">
                <div>
                    <h4 className="font-bold text-gray-800">{analysis.name}</h4>
                    <p className="text-xs text-gray-500">{analysis.date}</p>
                    <p className="text-xs text-gray-500 mt-1">{analysis.processingLevel}</p>
                </div>
                <HealthScoreCircle score={analysis.healthScore} size={50} strokeWidth={5} />
            </div>
            <div className="mt-2 pt-2 border-t border-gray-100 grid grid-cols-4 text-center text-xs">
                <div><p className="text-gray-500">kcal</p><p className="font-bold">{analysis.nutrients.kcal}</p></div>
                <div><p className="text-blue-500">prot.</p><p className="font-bold">{analysis.nutrients.protein}g</p></div>
                <div><p className="text-green-500">carbs</p><p className="font-bold">{analysis.nutrients.carbs}g</p></div>
                <div><p className="text-red-500">gord.</p><p className="font-bold">{analysis.nutrients.fat}g</p></div>
            </div>
        </div>
    </div>
);


const AnalysisPage: React.FC = () => {
    const { apiKey, analyses, setAnalyses } = useContext(AppContext);
    const [viewState, setViewState] = useState<'initial' | 'loading' | 'result' | 'error'>('initial');
    const [currentAnalysis, setCurrentAnalysis] = useState<Analysis | null>(null);
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
                const result = await analyzeDishFromImage(apiKey, base64Image, file.type);
                
                const newAnalysis: Analysis = {
                    ...result,
                    id: crypto.randomUUID(),
                    date: new Date().toLocaleDateString('pt-BR'),
                    imageUrl: imageUrl,
                };
                
                setCurrentAnalysis(newAnalysis);
                setAnalyses(prev => [newAnalysis, ...prev]);
                setViewState('result');
            } catch (err) {
                console.error(err);
                setError('Falha ao analisar o prato. Verifique sua chave de API e tente novamente.');
                setViewState('error');
            }
        };
        reader.onerror = () => {
            setError('Falha ao ler o arquivo de imagem.');
            setViewState('error');
        };
    };

    const handleAnalyzeClick = () => {
        fileInputRef.current?.click();
    };

    const renderContent = () => {
        switch (viewState) {
            case 'initial':
                return (
                    <div className="p-4">
                        <div className="bg-white p-6 rounded-2xl shadow-md text-center">
                            <div className="p-4 bg-gray-100 rounded-full mb-4 inline-block">
                                <CameraIcon className="w-8 h-8 text-gray-500" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-800">Analisar Prato</h2>
                            <p className="text-gray-500 mt-1 mb-4">Fotografe sua refeição e receba o Health Score instantâneo.</p>
                            <button onClick={handleAnalyzeClick} className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-primary-dark transition-colors">
                                <CameraIcon className="w-5 h-5"/>
                                <span>Fotografar Prato</span>
                            </button>
                            <button onClick={handleAnalyzeClick} className="text-sm text-primary font-semibold mt-3 flex items-center justify-center w-full space-x-2">
                                <UploadIcon className="w-4 h-4" />
                                <span>Enviar Foto</span>
                            </button>
                        </div>
                        <div className="mt-6">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-lg font-bold text-gray-800">Histórico de Análises</h3>
                                {analyses.length > 0 && <span className="text-sm text-primary font-semibold">Ver Todas</span>}
                            </div>
                            {analyses.length === 0 ? (
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
                                    <div className="p-3 bg-gray-100 rounded-full mb-3 inline-block">
                                        <BarChart2Icon className="w-6 h-6 text-gray-400" />
                                    </div>
                                    <h4 className="font-semibold text-gray-700 mb-1">Nenhuma análise no histórico</h4>
                                    <p className="text-sm text-gray-500">Comece analisando seu primeiro prato para ver os resultados aqui!</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {analyses.map(a => <AnalysisCard key={a.id} analysis={a} />)}
                                </div>
                            )}
                        </div>
                    </div>
                );
            case 'loading':
                return <Loader text="Analisando seu prato..." />;
            case 'result':
                return currentAnalysis && <AnalysisResult analysis={currentAnalysis} onNew={() => setViewState('initial')} />;
            case 'error':
                 return (
                    <div className="p-4 text-center">
                        <p className="text-red-500">{error}</p>
                        <button onClick={() => setViewState('initial')} className="mt-4 bg-primary text-white font-semibold py-2 px-4 rounded-lg">Tentar Novamente</button>
                    </div>
                );
        }
    };
    
    return (
        <div>
            <header className="bg-primary text-white p-4">
                <h1 className="text-2xl font-bold text-center">Análises</h1>
            </header>
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
            {renderContent()}
        </div>
    );
};

export default AnalysisPage;
