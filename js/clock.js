const ymddDiv = document.querySelector("#ymdd");
const hmsDiv = document.querySelector("#hms");

const days = [
  "일요일",
  "월요일",
  "화요일",
  "수요일",
  "목요일",
  "금요일",
  "토요일",
];

function getTime() {
  const now = new Date();

  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const day = days[now.getDay()];
  ymddDiv.innerText = `${year}년 ${month}월 ${date}일 ${day}`;

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  hmsDiv.innerText = `${hours}:${minutes}:${seconds}`;
}

getTime();
setInterval(getTime, 1000);
