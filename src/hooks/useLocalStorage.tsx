import { useCallback, useContext, useMemo } from "react";
import { LocalStorageContext } from "providers/localStorage/LocalStorageContextProvider";

export function useLocalStorage(
  key: string
): [string | undefined, (value: string | undefined) => void] {
  const { values, setValue } = useContext(LocalStorageContext);

  const value = useMemo(() => values[key], [key, values]);
  const setValueForKey = useCallback(
    (value: string | undefined) => setValue(key, value),
    [key, setValue]
  );

  return [value, setValueForKey];
}

export function useJSONLocalStorage<T extends object>(
  key: string
): [T | undefined, (value: T | undefined) => void] {
  const [stringValue, setStringValue] = useLocalStorage(key);

  const value = useMemo(
    () => stringValue && JSON.parse(stringValue),
    [stringValue]
  );
  const setValue = useCallback(
    (value: T | undefined) => {
      setStringValue(value && JSON.stringify(value));
    },
    [setStringValue]
  );

  return [value, setValue];
}
