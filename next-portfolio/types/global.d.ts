export {}

declare global {
  interface Window {
    showToast?: (message: string) => void;
    copyToClipboard?: (targetId: string) => Promise<void>;
    scrollToTop?: () => void;
  }
}
