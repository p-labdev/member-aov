document.addEventListener("DOMContentLoaded", () => {

  // ===== HOME ANIMATION =====
  const home = document.getElementById("home");
  const countdown = home.querySelector(".countdown");
  const btn = home.querySelector("button");
  const endsIn = home.querySelector(".countdown-title");

  // ==== Countdown bay lên + button hiện sau ====
  setTimeout(() => {
    countdown.classList.add("move-up"); // countdown di chuyển lên
    setTimeout(() => {
      btn.classList.add("show-btn"); // button xuất hiện đúng chỗ
      endsIn.classList.add("show");   // chữ "Ends in:" hiện
    }, 150);
  }, 3500);

  // ===== COUNTDOWN LOGIC =====
  const elDays = home.querySelector(".days");
  const elHours = home.querySelector(".hours");
  const elMinutes = home.querySelector(".minutes");
  const elSeconds = home.querySelector(".seconds");

  const targetDate = new Date("2026-03-01T00:00:00Z");

  function updateCountdown() {
    const now = new Date();
    let diff = targetDate - now;

    if (diff <= 0) diff = 0;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (elDays) elDays.textContent = days;
    if (elHours) elHours.textContent = String(hours).padStart(2, "0");
    if (elMinutes) elMinutes.textContent = String(minutes).padStart(2, "0");
    if (elSeconds) elSeconds.textContent = String(seconds).padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

});

// ===== PAGE NAV =====
function goTo(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// ===== SUBMIT FORM =====
function submitForm() {
  const name = document.getElementById("name").value.trim();
  const className = document.getElementById("class").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const fb = document.getElementById("fb").value.trim();
  const reason = document.getElementById("reason").value.trim();

  if (!name || !className || !fb) {
    alert("Vui lòng điền đầy đủ các mục bắt buộc (*)");
    return;
  }

  const fbRegex = /^(https?:\/\/)?(www\.)?(facebook|fb)\.com\/.+/;
  if (!fbRegex.test(fb)) {
    alert("Link Facebook không hợp lệ");
    return;
  }

  const data = {
    name,
    class: className,
    phone,
    facebook: fb.startsWith("http") ? fb : "https://" + fb,
    reason
  };

  fetch("https://script.google.com/macros/s/AKfycbzI7KKD_HKGLf3QXLg6DsrReBzyfYBZ1DK_NWyHyPDacryRwj5P3Jk5Vc7yGd6wYPct/exec", {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  goTo("thanks");
}
