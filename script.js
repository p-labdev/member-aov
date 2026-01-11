let selectedBan = "";


window.addEventListener("load", () => {
  const intro = document.getElementById("intro");

  setTimeout(() => {
    if (intro) intro.remove();
  }, 3500);
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