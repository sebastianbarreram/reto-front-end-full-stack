const useDateFormat = () => {
  const dateFormat = (date: string): string => {
    const getDate = new Date(date);
    getDate.setUTCHours(getDate.getUTCHours() - 5); // Convert to UTC-5

    const day = getDate.getUTCDate();
    const month = getDate.getUTCMonth() + 1;
    const year = getDate.getUTCFullYear();
    let hours = getDate.getUTCHours();
    let minutes = getDate.getUTCMinutes();

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const hou = hours < 10 ? '0' + hours : hours;
    const min = minutes < 10 ? '0' + minutes : minutes;
    const stringTime = hou + ':' + min + ' ' + ampm;

    return stringTime + ' - ' + day + '/' + month + '/' + year;
  };
  return { dateFormat };
};

export default useDateFormat;
