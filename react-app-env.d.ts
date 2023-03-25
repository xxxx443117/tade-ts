/// <reference types="react-scripts" />

interface Window {
  $App?: {
    fbEvent: (event: string) => void;
  };
}
