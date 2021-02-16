/**
 * Returns a user-friendly date (HH:MM) from rawTimestamp
 * @param rawTimestamp
 * @returns {string}
 */
export const timestampToHoursMinutes = (rawTimestamp) => {
    return new Date(rawTimestamp).toISOString().substr(11, 5)
};

/**
 * Returns a user-friendly date (HH:MM:ss) from rawTimestamp
 * @param rawTimestamp
 * @returns {string}
 */
export const timestampToHoursMinutesSeconds = (rawTimestamp) => {
    return new Date(rawTimestamp * 1000).toISOString().substr(11, 8)
};
