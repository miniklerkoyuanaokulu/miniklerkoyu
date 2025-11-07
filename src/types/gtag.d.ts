// Google Analytics gtag.js TypeScript tanımlamaları

interface Window {
  gtag: (
    command: 'config' | 'event' | 'js' | 'set',
    targetId: string,
    config?: Record<string, any>
  ) => void;
  dataLayer: any[];
}

