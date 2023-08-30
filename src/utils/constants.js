export const genderOptions = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' }
];

export const BASE_URL = import.meta.env.DEV
  ? import.meta.env.VITE_BASE_URL_SANDBOX
  : import.meta.env.VITE_BASE_URL;

export const APP_URL = import.meta.env.DEV
  ? import.meta.env.VITE_APP_URL_SANDBOX
  : import.meta.env.VITE_APP_URL;

export const GOOGLE_CLIENT_ID = import.meta.env.DEV
  ? import.meta.env.VITE_GOOGLE_CLIENT_ID_SANDBOX
  : import.meta.env.VITE_GOOGLE_CLIENT_ID;

export const STRIPE_PK = import.meta.env.DEV
  ? import.meta.env.VITE_STRIPE_PK_SANDBOX
  : import.meta.env.VITE_STRIPE_PK;

export const MIXED_PANEL_TOKEN = import.meta.env.VITE_MIXED_PANEL_TOKEN;
