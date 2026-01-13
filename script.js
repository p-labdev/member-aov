let selectedBan = "";


window.addEventListener("load", () => {
  const intro = document.getElementById("intro");
  const app = document.getElementById("app");

  // Intro hiển thị lâu hơn (ví dụ 8000ms = 8 giây)
  setTimeout(() => {
    if (intro) intro.classList.add("hide"); // chỉ thêm class hide
  }, 8000);

  // Khi animation fadeout kết thúc thì mới xóa intro và hiện app
  intro.addEventListener("animationend", (e) => {
    if (e.animationName === "introFadeOut") {
      intro.remove();
      app.classList.remove("hidden");
    }
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const elDays = document.getElementById('days');
  const elHours = document.getElementById('hours');
  const elMinutes = document.getElementById('minutes');
  const elSeconds = document.getElementById('seconds');

  if (!elDays || !elHours || !elMinutes || !elSeconds) return;

  // Dùng UTC rõ ràng để tránh lệch múi giờ (đổi nếu bạn muốn giờ địa phương)
  const targetDate = new Date('2026-03-01T00:00:00Z');
  if (isNaN(targetDate.getTime())) return;

  function updateCountdown() {
    const now = new Date();
    let diff = targetDate.getTime() - now.getTime();

    if (diff <= 0) {
      elDays.textContent = 0;
      elHours.textContent = '00';
      elMinutes.textContent = '00';
      elSeconds.textContent = '00';
      if (timer) clearInterval(timer);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);
    const minutes = Math.floor(diff / (1000 * 60));
    diff -= minutes * (1000 * 60);
    const seconds = Math.floor(diff / 1000);

    elDays.textContent = days;
    elHours.textContent = String(hours).padStart(2, '0');
    elMinutes.textContent = String(minutes).padStart(2, '0');
    elSeconds.textContent = String(seconds).padStart(2, '0');
  }

  // Cập nhật ngay lập tức
  updateCountdown();

  // Căn nhịp đến đúng đầu giây kế tiếp để tránh lệch
  const msToNextSecond = 1000 - (Date.now() % 1000);
  let timer;
  setTimeout(() => {
    updateCountdown();
    timer = setInterval(updateCountdown, 1000);
  }, msToNextSecond);
});




function goTo(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function selectBan(ban) {
  selectedBan = ban;
  document.getElementById('banTitle').innerText = "Đăng ký " + ban;
  goTo('form');
}

function submitForm() {
  const name = document.getElementById('name').value.trim();
  const className = document.getElementById('class').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const fb = document.getElementById('fb').value.trim();
  const reason = document.getElementById('reason').value.trim();

  const fbRegex = /^(https?:\/\/)?(www\.)?(facebook|fb)\.com\/.+/;

  if (!name || !className || !fb) {
    alert("Vui lòng điền đầy đủ các mục bắt buộc (*)");
    return;
  }

  if (!fbRegex.test(fb)) {
    alert("Link Facebook không đúng định dạng");
    return;
  }

  const data = {
    name,
    class: className,
    phone,
    facebook: fb.startsWith("http") ? fb : "https://" + fb,
    reason,
    ban: selectedBan
  };

  fetch("https://script.google.com/macros/s/AKfycbzI7KKD_HKGLf3QXLg6DsrReBzyfYBZ1DK_NWyHyPDacryRwj5P3Jk5Vc7yGd6wYPct/exec", {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  // ⚠️ KHÔNG chờ response
  goTo('thanks');
}

//https://script.google.com/macros/s/AKfycbzI7KKD_HKGLf3QXLg6DsrReBzyfYBZ1DK_NWyHyPDacryRwj5P3Jk5Vc7yGd6wYPct/exec


