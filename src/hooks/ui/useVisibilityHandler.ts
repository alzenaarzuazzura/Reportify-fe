import { useState, useCallback } from 'react';

type VisibilityState = {
  [key: string]: boolean;
}

type VisibilityHandler = {
  isVisible: (id: string) => boolean;
  show: (id: string) => void;
  hide: (id: string) => void;
}

export const useVisibilityHandler = (initialState: VisibilityState = {}): VisibilityHandler => {
  const [visibilityState, setVisibilityState] = useState<VisibilityState>(initialState);

  const isVisible = useCallback(
    (id: string): boolean => {
      return visibilityState[id] || false;
    },
    [visibilityState]
  );

  const show = useCallback((id: string) => {
    setVisibilityState((prev) => ({
      ...prev,
      [id]: true,
    }));
  }, []);

  const hide = useCallback((id: string) => {
    setVisibilityState((prev) => ({
      ...prev,
      [id]: false,
    }));
  }, []);

  return {
    isVisible,
    show,
    hide,
  };
};

export const useSingleVisibility = (initialVisible = false) => {
  const [isVisible, setIsVisible] = useState(initialVisible);

  const show = useCallback(() => setIsVisible(true), []);
  const hide = useCallback(() => setIsVisible(false), []);
  const toggle = useCallback(() => setIsVisible((prev) => !prev), []);

  return {
    isVisible,
    show,
    hide,
    toggle,
  };
};
