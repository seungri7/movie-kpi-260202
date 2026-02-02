// const form = document.getElementById("event-form");

// form.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const formData = new FormData(form);

//   fetch(
//     "https://script.google.com/macros/s/AKfycbyb8CxzsY3Y6uZgMCGUmrybOo7VXk9Q4behcWsS0th5pC7FRC-U35mqsmOFCU4jQ0j3/exec",
//     {
//       method: "POST",
//       body: formData,
//     }
//   )
//     .then(() => {
//       alert("응모가 완료되었습니다!");
//       form.reset();
//     })
//     .catch(() => alert("제출 오류. 다시 시도해주세요."));
// });

// https://script.google.com/macros/s/AKfycbyb8CxzsY3Y6uZgMCGUmrybOo7VXk9Q4behcWsS0th5pC7FRC-U35mqsmOFCU4jQ0j3/exec

const form = document.getElementById("event-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // 전화번호 정규화
  const rawPhone = form.phone.value;
  const phone = rawPhone.replace(/[^0-9]/g, "");

  if (!/^010\d{8}$/.test(phone)) {
    alert("전화번호는 010으로 시작하는 숫자 11자리여야 합니다.");
    return;
  }

  // 이메일 정규식 검사
  const email = form.email.value.trim();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|co\.kr)$/;

  if (!emailRegex.test(email)) {
    alert("이메일 형식이 잘못되었습니다. 예: test@example.com");
    return;
  }

  // 모든 유효성 통과 → 데이터 정리 후 제출
  form.phone.value = "'" + phone; // 정제된 번호로 덮어쓰기

  form.submit(); // 기본 submit 실행 (iframe 방식)

  // 약간의 지연 후 메인 페이지로 이동
  setTimeout(() => {
    alert("응모가 완료되었습니다!");
    window.location.href = "https://movieevnetpage.netlify.app";
  }, 1000); // 1초 후 리디렉션 (전송 시간 고려)
});

const eventClose = document.getElementById("eventB-close");

eventClose.addEventListener("click", function () {
  window.location.href = "index.html";
});
