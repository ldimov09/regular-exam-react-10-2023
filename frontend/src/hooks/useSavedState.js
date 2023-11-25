import { useState } from 'react';

export default function useSavedState(key, defaultValue) {
    const [state, setState] = useState(() => {
        const savedState = localStorage.getItem(key);
        if (savedState) {
            return JSON.parse(savedState);
        }
        return defaultValue;
    });


    const setSavedState = (value) => {
        setState(value);
        let serializedValue;
        if (typeof value === 'function') {
            serializedValue = JSON.stringify(value(state));
        } else {
            serializedValue = JSON.stringify(value);
        }
        localStorage.setItem(key, serializedValue);
    };

    return [
        state,
        setSavedState,
    ];
}
