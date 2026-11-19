
import React, { useContext, useState, useRef } from 'react';
import { AppContext } from '../context/AppContext';
// FIX: Import BarChart2Icon to resolve reference error.
import { UserIcon, HeartIcon, CookingPotIcon, TrashIcon, SettingsIcon, ChevronRightIcon, HelpCircleIcon, BarChart2Icon, CheckIcon, XIcon, EditIcon, ImageIcon, MailIcon, MessageCircleIcon, GlobeIcon, AlertTriangleIcon } from '../components/icons';
import ToggleSwitch from '../components/ToggleSwitch';

const ProfilePage: React.FC = () => {
    const { preferences, setPreferences, recipes, analyses, userProfile, setUserProfile, apiKey } = useContext(AppContext);
    const [showSettings, setShowSettings] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const [toast, setToast] = useState<{message: string, type: 'success' | 'error' | 'warning'} | null>(null);
    const [isEditingName, setIsEditingName] = useState(false);
    const [tempName, setTempName] = useState(userProfile.name);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Calcular estatísticas reais
    const totalRecipes = recipes.length;
    const totalAnalyses = analyses.length;
    const averageHealthScore = analyses.length > 0 
        ? Math.round(analyses.reduce((sum, analysis) => sum + analysis.healthScore, 0) / analyses.length)
        : 0;

    // Verificar se a chave API está configurada corretamente
    const isApiKeyValid = apiKey && apiKey !== 'GEMINI_API_KEY' && apiKey.startsWith('AIza');



    const showToast = (message: string, type: 'success' | 'error') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    }

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                showToast('Imagem muito grande. Máximo 5MB.', 'error');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64 = e.target?.result as string;
                setUserProfile(prev => ({ ...prev, profileImage: base64 }));
                showToast('Foto de perfil atualizada!', 'success');
            };
            reader.readAsDataURL(file);
        }
    };

    const handleNameSave = () => {
        if (!tempName.trim()) {
            showToast('Nome não pode estar vazio', 'error');
            return;
        }
        setUserProfile(prev => ({ ...prev, name: tempName.trim() }));
        setIsEditingName(false);
        showToast('Nome atualizado com sucesso!', 'success');
    };

    const handleNameCancel = () => {
        setTempName(userProfile.name);
        setIsEditingName(false);
    };

    const handleClearData = () => {
        localStorage.clear();
        showToast('Todos os dados foram apagados!', 'success');
        setTimeout(() => window.location.reload(), 1500);
    };

    return (
        <div>
            <header className="bg-primary text-white p-6">
                <div className="flex flex-col items-center">
                    <div className="relative">
                        <div className="w-24 h-24 bg-primary-light rounded-full flex items-center justify-center border-4 border-white mb-3 overflow-hidden">
                            {userProfile.profileImage ? (
                                <img 
                                    src={userProfile.profileImage} 
                                    alt="Foto de perfil" 
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <UserIcon className="w-12 h-12" />
                            )}
                        </div>
                        <button 
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-primary"
                        >
                            <ImageIcon className="w-4 h-4 text-primary" />
                        </button>
                        <input 
                            ref={fileInputRef}
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                    </div>
                    
                    <div className="flex items-center gap-2 mb-1">
                        {isEditingName ? (
                            <div className="flex items-center gap-2">
                                <input 
                                    type="text" 
                                    value={tempName}
                                    onChange={(e) => setTempName(e.target.value)}
                                    className="text-2xl font-bold bg-transparent border-b-2 border-white text-center text-white placeholder-white/70 focus:outline-none"
                                    placeholder="Seu nome"
                                    autoFocus
                                />
                                <button onClick={handleNameSave} className="text-green-300 hover:text-green-100">
                                    <CheckIcon className="w-5 h-5" />
                                </button>
                                <button onClick={handleNameCancel} className="text-red-300 hover:text-red-100">
                                    <XIcon className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl font-bold">{userProfile.name}</h1>
                                <button onClick={() => setIsEditingName(true)} className="text-white/70 hover:text-white">
                                    <EditIcon className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>
                    {/* <p className="text-primary-light">{userProfile.email}</p>*/}
                </div>
            </header>

            <div className="p-4 -mt-8">
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl shadow-lg border border-orange-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-2">
                            <CookingPotIcon className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-2xl font-bold text-gray-800">{totalRecipes}</p>
                        <p className="text-xs text-orange-600 font-medium">Receitas geradas</p>
                    </div>
                    <div className="bg-gradient-to-br from-red-50 to-pink-100 p-4 rounded-xl shadow-lg border border-red-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-2">
                            <HeartIcon className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-2xl font-bold text-gray-800">{averageHealthScore}</p>
                        <p className="text-xs text-red-600 font-medium">Health Score médio</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-4 rounded-xl shadow-lg border border-green-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
                            <BarChart2Icon className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-2xl font-bold text-gray-800">{totalAnalyses}</p>
                        <p className="text-xs text-green-600 font-medium">Pratos analisados</p>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-lg border border-blue-200 mt-4">
                    <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-3">
                            <SettingsIcon className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="font-bold text-lg text-gray-800">Preferências</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="font-semibold">Receitas vegetarianas</h4>
                                <p className="text-sm text-gray-500">Priorizar opções sem carne</p>
                            </div>
                            <ToggleSwitch id="vegetarian" checked={preferences.vegetarian} onChange={c => setPreferences(p => ({...p, vegetarian: c}))}/>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="font-semibold">Baixo teor de sódio</h4>
                                <p className="text-sm text-gray-500">Menos sal nas receitas</p>
                            </div>
                           <ToggleSwitch id="low-sodium" checked={preferences.lowSodium} onChange={c => setPreferences(p => ({...p, lowSodium: c}))}/>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="font-semibold">Alto teor proteico</h4>
                                <p className="text-sm text-gray-500">Focar em receitas com mais proteína</p>
                            </div>
                            <ToggleSwitch id="high-protein" checked={preferences.highProtein} onChange={c => setPreferences(p => ({...p, highProtein: c}))}/>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md mt-4 divide-y divide-gray-200">
                    <button onClick={() => setShowSettings(!showSettings)} className="w-full flex justify-between items-center p-4 text-left">
                        <div className="flex items-center">
                            <SettingsIcon className="w-5 h-5 text-gray-500 mr-3" />
                            <span className="font-semibold">Configurações</span>
                        </div>
                        <ChevronRightIcon className={`w-5 h-5 text-gray-400 transition-transform ${showSettings ? 'rotate-90' : ''}`} />
                    </button>
                    {showSettings && (
                         <div className="p-4 animate-fade-in">
                             <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                                 {isApiKeyValid ? (
                                     <>
                                         <div className="flex items-center mb-3">
                                             <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                                 <CheckIcon className="w-5 h-5 text-green-600" />
                                             </div>
                                             <div>
                                                 <h4 className="font-semibold text-gray-900">IA Gemini Configurada</h4>
                                                 <p className="text-sm text-gray-600">Sistema pronto para uso com IA integrada</p>
                                             </div>
                                         </div>
                                         <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                                             <p className="text-xs text-green-700 flex items-start space-x-2">
                                                 <span className="text-green-500 mt-0.5">✅</span>
                                                 <span>A IA Gemini está configurada e pronta para gerar receitas e análises nutricionais automaticamente.</span>
                                             </p>
                                         </div>
                                     </>
                                 ) : (
                                     <>
                                         <div className="flex items-center mb-3">
                                             <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                                                 <AlertTriangleIcon className="w-5 h-5 text-red-600" />
                                             </div>
                                             <div>
                                                 <h4 className="font-semibold text-gray-900">IA Gemini Não Configurada</h4>
                                                 <p className="text-sm text-gray-600">Chave API necessária para funcionar</p>
                                             </div>
                                         </div>
                                         <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                                             <p className="text-xs text-red-700 flex items-start space-x-2">
                                                 <span className="text-red-500 mt-0.5">⚠️</span>
                                                 <span>Para usar a IA Gemini, é necessário configurar uma chave API válida no arquivo AppContext.tsx. Consulte o README.md para instruções.</span>
                                             </p>
                                         </div>
                                     </>
                                 )}
                             </div>
                         </div>
                    )}
                     <button onClick={() => setShowHelp(!showHelp)} className="w-full flex justify-between items-center p-4 text-left">
                        <div className="flex items-center">
                            <HelpCircleIcon className="w-5 h-5 text-gray-500 mr-3" />
                            <span className="font-semibold">Ajuda e Suporte</span>
                        </div>
                        <ChevronRightIcon className={`w-5 h-5 text-gray-400 transition-transform ${showHelp ? 'rotate-90' : ''}`} />
                    </button>
                    {showHelp && (
                         <div className="p-4 animate-fade-in space-y-4">
                             <div className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors">
                                 <div className="flex items-center space-x-3">
                                     <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                         <MailIcon className="w-5 h-5 text-blue-600" />
                                     </div>
                                     <div className="flex-1">
                                         <p className="text-sm font-medium text-gray-900">E-mail</p>
                                         <a href="mailto:contato@packtypebot.com.br" className="text-sm text-primary hover:text-primary-dark font-medium">contato@packtypebot.com.br</a>
                                     </div>
                                 </div>
                             </div>
                             <div className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors">
                                 <div className="flex items-center space-x-3">
                                     <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                         <MessageCircleIcon className="w-5 h-5 text-green-600" />
                                     </div>
                                     <div className="flex-1">
                                         <p className="text-sm font-medium text-gray-900">WhatsApp</p>
                                         <a href="https://wa.me/5562991252643" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:text-primary-dark font-medium">+55 62 99125-2643</a>
                                     </div>
                                 </div>
                             </div>
                             <div className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors">
                                 <div className="flex items-center space-x-3">
                                     <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                         <GlobeIcon className="w-5 h-5 text-purple-600" />
                                     </div>
                                     <div className="flex-1">
                                         <p className="text-sm font-medium text-gray-900">Site</p>
                                         <a href="https://clubdosoftware.com.br/" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:text-primary-dark font-medium">clubdosoftware.com.br</a>
                                     </div>
                                 </div>
                             </div>
                         </div>
                    )}
                </div>

                <div className="mt-6 text-center">
                     <button 
                        onClick={handleClearData}
                        className="text-red-500 font-semibold flex items-center justify-center w-full hover:text-red-600 transition-colors"
                    >
                        <TrashIcon className="w-5 h-5 mr-2" />
                        Apagar dados
                    </button>
                </div>
            </div>

            {/* Toast Notification */}
            {toast && (
                <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in ${
                    toast.type === 'success' ? 'bg-green-500 text-white' : 
                    toast.type === 'error' ? 'bg-red-500 text-white' : 
                    'bg-yellow-500 text-white'
                }`}>
                    {toast.type === 'success' ? (
                        <CheckIcon className="w-5 h-5" />
                    ) : toast.type === 'error' ? (
                        <XIcon className="w-5 h-5" />
                    ) : (
                        <TrashIcon className="w-5 h-5" />
                    )}
                    <span className="font-medium">{toast.message}</span>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;