import { useEffect, useState } from "react";

export function useLocalStorageState(initialState, key) {
 const [value, setValue] = useState(() => {
		const storedState = JSON.parse(localStorage.getItem(key));
		return storedState ? storedState : initialState;
	});
    useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [value, key]);
    return [value, setValue]
}
