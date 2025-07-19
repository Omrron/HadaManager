import { useEffect, useState } from "react";

function getSavedValue(key: string, initialValue: any) {
    let storageItem = localStorage.getItem(key);

    if (storageItem !== null) JSON.parse(storageItem);

    if (initialValue instanceof Function) return initialValue();

    return initialValue;
}

export default function useLocalStorage(key: string, initialValue: any) {
    const [value, setValue] = useState(() => {
        return getSavedValue(key, initialValue);
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value])

    return [value, setValue];
}