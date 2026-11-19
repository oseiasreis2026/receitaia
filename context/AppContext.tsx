
import React, { createContext, useState, ReactNode } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { Page, Recipe, Analysis, UserPreferences, UserProfile } from '../types';

interface AppContextType {
  activePage: Page;
  setActivePage: (page: Page) => void;
  apiKey: string;
  recipes: Recipe[];
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
  analyses: Analysis[];
  setAnalyses: React.Dispatch<React.SetStateAction<Analysis[]>>;
  preferences: UserPreferences;
  setPreferences: React.Dispatch<React.SetStateAction<UserPreferences>>;
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<Page>('home');
  const apiKey = 'SUA_API_KEY_AQUI';
  const [recipes, setRecipes] = useLocalStorage<Recipe[]>('recipes-history', []);
  const [analyses, setAnalyses] = useLocalStorage<Analysis[]>('analyses-history', []);
  const [preferences, setPreferences] = useLocalStorage<UserPreferences>('user-preferences', {
    vegetarian: false,
    lowSodium: false,
    highProtein: true,
  });
  const [userProfile, setUserProfile] = useLocalStorage<UserProfile>('user-profile', {
    name: 'Usuário',
    email: 'usuario@receitia.com',
    profileImage: '',
  });

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage,
        apiKey,
        recipes,
        setRecipes,
        analyses,
        setAnalyses,
        preferences,
        setPreferences,
        userProfile,
        setUserProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
