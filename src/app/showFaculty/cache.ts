
interface TimeStamp {
  epoch_seconds: number;
}

interface CachedFacultyData {
  facultyData: FacultyData[];
  timestamp: TimeStamp;
}

export const cacheFacultyDetials = new Map<number, CachedFacultyData>();

export const getCachedData = (index: number): CachedFacultyData | null => {
  const cachedData = cacheFacultyDetials.get(index);
  if (!cachedData) return null;
  const epoch_secs_now: number = Date.now();
  const mins_5 = 5 * 60 * 1000;
  if (epoch_secs_now - cachedData.timestamp.epoch_seconds > mins_5) {
    cacheFacultyDetials.delete(index);
    return null;
  }

  return cachedData;
};
