document.addEventListener("DOMContentLoaded", () => {

  // ===== HOME ANIMATION =====
  const home = document.getElementById("home");
  const countdown = home.querySelector(".countdown");
  const btn = home.querySelector("button");
  const endsIn = home.querySelector(".countdown-title");

  // Tự cuộn khi focus input / textarea (mobile friendly)
  const inputs = document.querySelectorAll('input, textarea, select');
  
  inputs.forEach(el => {
    el.addEventListener('focus', () => {
      setTimeout(() => {
        el.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 300); // đợi bàn phím hiện xong
    });
  });

  // Tạo phần tử hiển thị "Đăng ký đã hết hạn" nếu chưa có
  let expiredText = home.querySelector(".expired-text");
  if (!expiredText) {
    expiredText = document.createElement("div");
    expiredText.className = "expired-text";
    expiredText.textContent = "Đăng ký đã hết hạn";
    expiredText.style.display = "none";
    expiredText.style.color = "#ff6b6b";
    expiredText.style.fontWeight = "600";
    expiredText.style.marginTop = "12px";
    home.appendChild(expiredText);
  }

  // ==== Countdown bay lên + button hiện sau ====
  setTimeout(() => {
    countdown.classList.add("move-up"); // countdown di chuyển lên
    setTimeout(() => {
      btn.classList.add("show-btn"); // button xuất hiện đúng chỗ
      endsIn.classList.add("show");   // chữ "Ends in:" hiện
      
    }, 150);
  }, 3500);
  
  // Đã sửa 450 thành 4500 ở đây!
  setTimeout(() => {
    home.classList.add("has-loaded"); 
  }, 4500); 

  // ===== COUNTDOWN LOGIC =====
  const elDays = home.querySelector(".days");
  const elHours = home.querySelector(".hours");
  const elMinutes = home.querySelector(".minutes");
  const elSeconds = home.querySelector(".seconds");

  const targetDate = new Date(Date.UTC(2026, 10, 23, 17, 0, 0)); // UTC = VN-7

  function updateCountdown() {
    const now = new Date();
    let diff = targetDate - now;

    if (diff <= 0) {
      diff = 0;

      // Ẩn nút đăng ký
      if (btn) btn.style.display = "none";

      // Hiện chữ "Đăng ký đã hết hạn"
      if (expiredText) expiredText.style.display = "block";
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (elDays) elDays.textContent = days;
    if (elHours) elHours.textContent = String(hours).padStart(2, "0");
    if (elMinutes) elMinutes.textContent = String(minutes).padStart(2, "0");
    if (elSeconds) elSeconds.textContent = String(seconds).padStart(2, "0");
  }

  // ===== Chạy countdown mỗi giây =====
  updateCountdown();
  const timer = setInterval(() => {
    updateCountdown();
    if (targetDate - new Date() <= 0) clearInterval(timer);
  }, 1000);

});

// ===== PAGE NAV =====
// ===== PAGE NAV =====
function goTo(id, btn = null) {
  // Thêm hiệu ứng chớp màu nút nhưng KHÔNG bắt trang web phải đợi
  if (btn) {
    btn.classList.add('is-clicking');
    setTimeout(() => btn.classList.remove('is-clicking'), 400); 
  }

  // Ẩn tất cả các trang và xóa sạch các class hiệu ứng cũ
  document.querySelectorAll(".page").forEach(p => {
    p.classList.remove("active", "slide-in-right", "slide-in-left");
  });

  // Xác định trang đích và cho hiển thị
  const targetPage = document.getElementById(id);
  targetPage.classList.add("active");

  // Logic chia 2 ngả: Về trang chủ thì trượt từ trái, đi trang khác thì trượt từ phải
  if (id === "home") {
    targetPage.classList.add("slide-in-left");
  } else {
    targetPage.classList.add("slide-in-right");
  }
}
// ===== SUBMIT FORM =====
function submitForm(btn) {
  const name = document.getElementById("name").value.trim();
  const className = document.getElementById("class").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const fb = document.getElementById("fb").value.trim();
  const reason = document.getElementById("reason").value.trim();
  const major = document.getElementById("major").value;

  if (!name || !className || !fb || !major) {
    alert("Vui lòng điền đầy đủ các mục bắt buộc (*)");
    return;
  }

  const fbRegex = /^(https?:\/\/)?(www\.)?(facebook|fb)\.com\/.+/;
  if (!fbRegex.test(fb)) {
    alert("Link Facebook không hợp lệ");
    return;
  }

  // Khai báo cục data chuẩn xác với các key trong Google Apps Script
  const data = {
    name: name,
    classname: className, // Đã đổi class thành classname
    phone: phone,
    fb: fb.startsWith("http") ? fb : "https://" + fb, // Đã đổi facebook thành fb
    major: major,
    reason: reason
  };

  fetch("https://script.google.com/macros/s/AKfycbzoosnY9Aa4O0zNrw6qm3ZjhYfQGH7eAeqFCmODOMEsH_4E4Y6hTw7VdsgWSVigQ9oF2Q/exec", {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  // Gọi trực tiếp hàm goTo (nó sẽ tự xử lý hiệu ứng chớp màu và delay 400ms rồi chuyển trang)
  goTo("thanks", btn);
}
