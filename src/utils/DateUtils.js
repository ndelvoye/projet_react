export const timestampToHoursMinutes = (rawTimestamp) => {
    return new Date(rawTimestamp).toISOString().substr(11, 5)
};

export const timestampToHoursMinutesSeconds = (rawTimestamp) => {
    return new Date(rawTimestamp * 1000).toISOString().substr(11, 8)
};
