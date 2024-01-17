export const convertDatetime = (dateTime) => {
  const date = new Date(dateTime);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  const convertedDatetime = `${year}.${month}.${day}`;
  return convertedDatetime;
};

export const checkDatetimeEqual = (time1, time2) => {
  // 두 시간의 초 단위(이후 소수점 무시)까지 비교, 같으면 true
  return time1.slice(0, 19) === time2.slice(0, 19);
};
