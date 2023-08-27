interface PreviousState{
    index: number;
}

interface CachedTime {
  cachedTimeInEpoch: number;
}

const keyLocalStoragePreviousState = "previousState";
const mins_15 = 15 * 60 * 1000;

export const savePreviousStateToLocalStorage = (state: PreviousState) => {
    localStorage.setItem(keyLocalStoragePreviousState, JSON.stringify( { ...state, cachedTimeInEpoch: Date.now() } as CachedTime & PreviousState));
}

export const getPreviousStateFromLocalStorage = (): PreviousState | null => {
    const previousState = localStorage.getItem(keyLocalStoragePreviousState);
    if (!previousState) return null;
    const previousStateParsed = JSON.parse(previousState) as PreviousState & CachedTime;
    const timestamp = previousStateParsed.cachedTimeInEpoch;
    if (Date.now() - timestamp > mins_15) {
      localStorage.removeItem(keyLocalStoragePreviousState);
      return null;
    }
    return previousStateParsed;
}

