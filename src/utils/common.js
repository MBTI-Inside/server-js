/**
 * 작성자명 : 원종석
 * 작성일자 : 2023-08-28 (월)
 * 작성내용 : Date 객체를 전달 받아 특정 형태의 날짜 string으로 변환 후 반환한다.
 * @param {Date} date 날짜
 * @returns "YYYY-MM-DD" 형태의 string 데이터
 */
export const formatDateToString = (date) => {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1을 하고 2자리로 포맷
  const day = String(date.getUTCDate()).padStart(2, '0'); // 일자를 2자리로 포맷

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

/**
 * 작성자명 : 원종석
 * 작성일자 : 2023-08-28 (월)
 * 작성내용 : 기준 날짜와 현재 날짜의 시간 차이를 구하여 일자로 반환한다.
 * @param {Date} date 날짜
 * @returns number 형태의 시간 차이 값
 */
export const setKoreaDay = (date) => {
  const createdDate = new Date(date);
  const currentDate = new Date();

  const timeDiff = currentDate.getTime() - createdDate.getTime();
  const day = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));

  return day;
};

/**
 * 작성자명 : 원종석
 * 작성일자 : 2024-07-08 (월)
 * 작성내용 : 입력받은 배열을 랜덤하게 인덱스를 섞는다.
 * @param {Array} array 객체 형태의 배열
 * @returns 배열
 */
export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

/**
 * 작성자명 : 원종석
 * 작성일자 : 2024-12-07 (토)
 * 작성내용 : 입력받은 객체가 비어 있는지 확인한다.
 * @param {Object} obj 비어 있는지 확인할 객체
 * @returns {boolean} 객체가 비어 있으면 true, 그렇지 않으면 false
 */
export const isEmptyObj = (obj) => {
  if (obj.constructor === Object && Object.keys(obj).length === 0) {
    return true;
  }

  return false;
};
