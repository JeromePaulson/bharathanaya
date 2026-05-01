import { useEffect } from 'react';

/**
 * Hook to disable right-click (context menu) across the website or specific ref.
 * It also prevents global dragstart events to prevent dragging images or content.
 */
export const useDisableRightClick = () => {
  useEffect(() => {
    const handleContextMenu = (e) => {
      // Allow context menu on input fields so users can still copy/paste text
      if (
        e.target.tagName === 'INPUT' ||
        e.target.tagName === 'TEXTAREA' ||
        e.target.isContentEditable
      ) {
        return;
      }
      e.preventDefault();
    };

    const handleDragStart = (e) => {
      // Prevent drag events globally unless it's an editable field
      if (
        e.target.tagName === 'INPUT' ||
        e.target.tagName === 'TEXTAREA' ||
        e.target.isContentEditable
      ) {
        return;
      }
      e.preventDefault();
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('dragstart', handleDragStart);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, []);
};
