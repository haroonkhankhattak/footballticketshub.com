import React, { createContext, useContext, useState, useEffect } from "react";

interface CurrencyLanguageContextType {
    selectedCurrency: string;
    setSelectedCurrency: (currency: string) => void;
    selectedLanguage: string;
    setSelectedLanguage: (language: string) => void;
}

const CurrencyLanguageContext = createContext<CurrencyLanguageContextType | undefined>(undefined);

export const CurrencyLanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedCurrency, setSelectedCurrency] = useState("gbp");
    const [selectedLanguage, setSelectedLanguage] = useState("en");

    useEffect(() => {
        const savedCurrency = localStorage.getItem("selectedCurrency");
        const savedLanguage = localStorage.getItem("selectedLanguage");

        if (savedCurrency) setSelectedCurrency(savedCurrency);
        if (savedLanguage) setSelectedLanguage(savedLanguage);
    }, []);

    useEffect(() => {
        localStorage.setItem("selectedCurrency", selectedCurrency);
    }, [selectedCurrency]);

    useEffect(() => {
        localStorage.setItem("selectedLanguage", selectedLanguage);
    }, [selectedLanguage]);

    useEffect(() => {
        const savedCurrency = localStorage.getItem("selectedCurrency");
        const savedLanguage = localStorage.getItem("selectedLanguage");

        if (savedCurrency) {
            setSelectedCurrency(savedCurrency);
        } else {
            setSelectedCurrency("gbp");
        }

        if (savedLanguage) {
            setSelectedLanguage(savedLanguage);
        } else {
            setSelectedLanguage("en");
        }
    }, []);


    return (
        <CurrencyLanguageContext.Provider
            value={{ selectedCurrency, setSelectedCurrency, selectedLanguage, setSelectedLanguage }}>
            {children}
        </CurrencyLanguageContext.Provider>
    );
};

export const useCurrencyLanguage = () => {
    const context = useContext(CurrencyLanguageContext);
    if (!context) {
        throw new Error("useCurrencyLanguage must be used within a CurrencyLanguageProvider");
    }
    return context;
};
