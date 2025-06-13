
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'fi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    home: 'Home',
    services: 'Services',
    pricing: 'Pricing',
    map: 'Map',
    contact: 'Contact',
    signUp: 'Sign Up',
    
    // Homepage
    heroTitle: 'Advanced Medical Technology for Beauty and Aesthetics',
    heroSubtitle: 'Specializing in importing, selling, installing, and servicing LASER and dermatology equipment for professional beauty treatments.',
    getStarted: 'Get Started',
    learnMore: 'Learn More',
    
    // Services
    servicesTitle: 'Our Services',
    servicesSubtitle: 'Comprehensive medical technology solutions for aesthetic professionals',
    laserEquipment: 'LASER Equipment',
    laserDescription: 'High-quality laser systems for various aesthetic treatments',
    dermatologyEquipment: 'Dermatology Equipment',
    dermatologyDescription: 'Professional dermatology devices for skin treatments',
    installationServices: 'Installation Services',
    installationDescription: 'Expert installation and setup of medical equipment',
    maintenanceServices: 'Maintenance Services',
    maintenanceDescription: 'Ongoing maintenance and support for your equipment',
    
    // Pricing
    pricingTitle: 'Pricing',
    pricingSubtitle: 'Transparent pricing for our services and equipment',
    service: 'Service',
    description: 'Description',
    price: 'Price',
    laserEquipmentPrice: 'Professional LASER systems starting from',
    installationPrice: 'Professional installation and setup',
    maintenancePrice: 'Annual maintenance contract',
    
    // Contact
    contactTitle: 'Contact Us',
    contactSubtitle: 'Get in touch with our team',
    name: 'Name',
    email: 'Email',
    subject: 'Subject',
    message: 'Message',
    send: 'Send Message',
    phone: 'Phone',
    address: 'Address',
    
    // Sign Up
    signUpTitle: 'Create Account',
    signUpSubtitle: 'Join our platform to access exclusive services',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    createAccount: 'Create Account',
    
    // Map
    mapTitle: 'Our Location',
    mapSubtitle: 'Visit us at our headquarters in Vantaa, Finland',
    
    // Footer
    companyInfo: 'Sparkka Oy - Your trusted partner in medical aesthetic technology',
    allRightsReserved: 'All rights reserved',
    
    // Forms
    required: 'This field is required',
    invalidEmail: 'Invalid email address',
    passwordTooShort: 'Password must be at least 8 characters',
    passwordsDoNotMatch: 'Passwords do not match',
    success: 'Success!',
    error: 'Error occurred. Please try again.',
    thankYou: 'Thank you for your message!',
    accountCreated: 'Account created successfully!',
    signupSuccess: 'Signup successful! Check your email for verification.',
    signupError: 'Signup failed. Please try again.',
    unexpectedError: 'An unexpected error occurred. Please try again.',
    emailVerificationSent: 'Please check your email for verification instructions.',
    goToHomepage: 'Go to Homepage',
    alreadyHaveAccount: 'Already have an account?',
    signIn: 'Sign in',
    namePlaceholder: 'Your full name',
    emailPlaceholder: 'your.email@example.com',
    phonePlaceholder: '+358 40 123 4567',
    passwordPlaceholder: 'Minimum 8 characters',
    confirmPasswordPlaceholder: 'Confirm your password',
  },
  fi: {
    // Navigation
    home: 'Etusivu',
    services: 'Palvelut',
    pricing: 'Hinnoittelu',
    map: 'Kartta',
    contact: 'Yhteystiedot',
    signUp: 'Rekisteröidy',
    
    // Homepage
    heroTitle: 'Edistynyt lääketieteellinen teknologia kauneuteen ja estetiikkaan',
    heroSubtitle: 'Erikoistumme LASER- ja dermatologiavälineiden maahantuontiin, myyntiin, asennukseen ja huoltoon ammattimaisiin kauneudenhoitoihin.',
    getStarted: 'Aloita',
    learnMore: 'Lue lisää',
    
    // Services
    servicesTitle: 'Palvelumme',
    servicesSubtitle: 'Kattavat lääketieteelliset teknologiaratkaisut estetiikan ammattilaisille',
    laserEquipment: 'LASER-laitteet',
    laserDescription: 'Korkealaatuiset laserjärjestelmät erilaisiin esteettisiin hoitoihin',
    dermatologyEquipment: 'Dermatologialaitteet',
    dermatologyDescription: 'Ammattimaiset dermatologialaitteet ihonhoitoihin',
    installationServices: 'Asennuspalvelut',
    installationDescription: 'Asiantunteva asennus ja lääketieteellisten laitteiden käyttöönotto',
    maintenanceServices: 'Huoltopalvelut',
    maintenanceDescription: 'Jatkuva huolto ja tuki laitteillesi',
    
    // Pricing
    pricingTitle: 'Hinnoittelu',
    pricingSubtitle: 'Läpinäkyvä hinnoittelu palveluille ja laitteille',
    service: 'Palvelu',
    description: 'Kuvaus',
    price: 'Hinta',
    laserEquipmentPrice: 'Ammattimaiset LASER-järjestelmät alkaen',
    installationPrice: 'Ammattimainen asennus ja käyttöönotto',
    maintenancePrice: 'Vuosittainen huoltosopimus',
    
    // Contact
    contactTitle: 'Ota yhteyttä',
    contactSubtitle: 'Ota yhteyttä tiimimme kanssa',
    name: 'Nimi',
    email: 'Sähköposti',
    subject: 'Aihe',
    message: 'Viesti',
    send: 'Lähetä viesti',
    phone: 'Puhelin',
    address: 'Osoite',
    
    // Sign Up
    signUpTitle: 'Luo tili',
    signUpSubtitle: 'Liity alustaamme päästäksesi eksklusiivisiin palveluihin',
    password: 'Salasana',
    confirmPassword: 'Vahvista salasana',
    createAccount: 'Luo tili',
    
    // Map
    mapTitle: 'Sijaintimme',
    mapSubtitle: 'Vieraile päätoimistossamme Vantaalla, Suomessa',
    
    // Footer
    companyInfo: 'Sparkka Oy - Luotettava kumppanisi lääketieteellisessä estetiikkateknologiassa',
    allRightsReserved: 'Kaikki oikeudet pidätetään',
    
    // Forms
    required: 'Tämä kenttä on pakollinen',
    invalidEmail: 'Virheellinen sähköpostiosoite',
    passwordTooShort: 'Salasanan tulee olla vähintään 8 merkkiä',
    passwordsDoNotMatch: 'Salasanat eivät täsmää',
    success: 'Onnistui!',
    error: 'Virhe tapahtui. Yritä uudelleen.',
    thankYou: 'Kiitos viestistäsi!',
    accountCreated: 'Tili luotu onnistuneesti!',
    signupSuccess: 'Rekisteröityminen onnistui! Tarkista sähköpostisi vahvistusta varten.',
    signupError: 'Rekisteröityminen epäonnistui. Yritä uudelleen.',
    unexpectedError: 'Odottamaton virhe tapahtui. Yritä uudelleen.',
    emailVerificationSent: 'Tarkista sähköpostisi vahvistusohjeiden saamiseksi.',
    goToHomepage: 'Siirry etusivulle',
    alreadyHaveAccount: 'Onko sinulla jo tili?',
    signIn: 'Kirjaudu sisään',
    namePlaceholder: 'Koko nimesi',
    emailPlaceholder: 'sinun.sahkoposti@esimerkki.com',
    phonePlaceholder: '+358 40 123 4567',
    passwordPlaceholder: 'Vähintään 8 merkkiä',
    confirmPasswordPlaceholder: 'Vahvista salasanasi',
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
