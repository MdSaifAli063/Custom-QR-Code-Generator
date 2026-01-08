function generateQR() {
  const qrText = document.getElementById("qrText").value;
  const qrCodeDiv = document.getElementById("qrCode");

  const qrCodeImage = generateQRCode(qrText);

  
  qrCodeDiv.innerHTML = "";
  qrCodeDiv.appendChild(qrCodeImage);
}


function generateQRCode(text) {
  const qrImage = document.createElement("img");
  qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
    text
  )}&size=200x200`;
  return qrImage;
}


window.lastGeneratedQrUrl = window.lastGeneratedQrUrl || "";


document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("qrForm");
  const textInput = document.getElementById("qrText");
  const qrCodeDiv = document.getElementById("qrCode");
  const qrInfo = document.getElementById("qrInfo");
  const sizeRange = document.getElementById("size");
  const sizeNumber = document.getElementById("sizeNumber");
  const fgColor = document.getElementById("fgColor");
  const bgColor = document.getElementById("bgColor");
  const ecc = document.getElementById("ecc");
  const downloadBtn = document.getElementById("downloadBtn");
  const copyLinkBtn = document.getElementById("copyLinkBtn");
  const clearBtn = document.getElementById("clearBtn");

  
  window.lastGeneratedQrUrl = "";


  sizeRange.addEventListener("input", () => {
    sizeNumber.value = sizeRange.value;
  });
  sizeNumber.addEventListener("input", () => {
    let v = parseInt(sizeNumber.value, 10) || 100;
    if (v < 100) v = 100;
    if (v > 1000) v = 1000;
    sizeNumber.value = v;
    sizeRange.value = v;
  });

  // Form submit -> generate
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    buildAndShowQR();
  });

  // Clear button
  clearBtn.addEventListener("click", () => {
    form.reset();
    sizeRange.value = 300;
    sizeNumber.value = 300;
    qrCodeDiv.innerHTML = "Your QR will appear here";
    qrInfo.textContent = "";
    downloadBtn.disabled = true;
    copyLinkBtn.disabled = true;
    lastUrl = "";
  });

  // Copy link (uses global lastGeneratedQrUrl)
  copyLinkBtn.addEventListener("click", async () => {
    const lastUrl = window.lastGeneratedQrUrl || "";
    if (!lastUrl) return;
    try {
      await navigator.clipboard.writeText(lastUrl);
      qrInfo.textContent = "Link copied to clipboard";
      setTimeout(() => (qrInfo.textContent = ""), 1400);
    } catch {
      // fallback: show the url to user so they can copy manually
      qrInfo.textContent = "Unable to copy automatically — URL shown below";
      const t = document.createElement("textarea");
      t.value = lastUrl;
      document.body.appendChild(t);
      t.select();
      setTimeout(() => {
        t.remove();
      }, 1200);
    }
  });

  // Download - fetch the image as blob and download (works better across origins)
  downloadBtn.addEventListener("click", async () => {
    const lastUrl = window.lastGeneratedQrUrl || "";
    if (!lastUrl) return;
    downloadBtn.disabled = true;
    const prev = qrInfo.textContent;
    qrInfo.textContent = "Preparing download...";
    try {
      const resp = await fetch(lastUrl, { mode: "cors" });
      if (!resp.ok) throw new Error("Download failed");
      const blob = await resp.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = "qrcode.png";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(blobUrl);
      qrInfo.textContent = "Downloaded";
    } catch (err) {
      console.error(err);
      qrInfo.textContent =
        "Download failed — try opening the image and saving manually.";
      // fallback: open in new tab
      window.open(lastUrl, "_blank");
    } finally {
      downloadBtn.disabled = false;
      setTimeout(() => (qrInfo.textContent = prev), 1400);
    }
  });
});

// Build URL and show QR (update to set global lastGeneratedQrUrl)
function buildAndShowQR() {
  const text = document.getElementById("qrText").value || "";
  const qrCodeDiv = document.getElementById("qrCode");
  const qrInfo = document.getElementById("qrInfo");
  const size = document.getElementById("size").value || 300;
  const fg = (document.getElementById("fgColor").value || "#000000").replace(
    "#",
    ""
  );
  const bg = (document.getElementById("bgColor").value || "#ffffff").replace(
    "#",
    ""
  );
  const eccValue = document.getElementById("ecc").value || "H";
  const downloadBtn = document.getElementById("downloadBtn");
  const copyLinkBtn = document.getElementById("copyLinkBtn");

  if (!text.trim()) {
    qrInfo.textContent = "Please enter text or URL.";
    return;
  }

  // Show spinner / busy state
  qrCodeDiv.innerHTML = '<div class="spinner" aria-hidden="true"></div>';
  qrInfo.textContent = "Generating...";
  downloadBtn.disabled = true;
  copyLinkBtn.disabled = true;

  // Build API URL (encode text to support anything: emojis, long text, special chars)
  const base = "https://api.qrserver.com/v1/create-qr-code/";
  const params = new URLSearchParams({
    data: text,
    size: `${size}x${size}`,
    color: fg,
    bgcolor: bg,
    ecc: eccValue,
    format: "png",
    margin: "0",
  });
  const url = `${base}?${params.toString()}`;

  // Load image to ensure it is generated before swapping UI
  const img = new Image();
  img.alt = "Generated QR code";
  img.crossOrigin = "anonymous"; // attempt anonymous fetch so blob operations can work
  img.onload = () => {
    qrCodeDiv.innerHTML = "";
    img.className = "generated-qr";
    qrCodeDiv.appendChild(img);
    qrInfo.textContent = `Size: ${size}px · ECC: ${eccValue}`;
    downloadBtn.disabled = false;
    copyLinkBtn.disabled = false;
    // store lastUrl for copy/download in a global var
    window.lastGeneratedQrUrl = url;
  };
  img.onerror = () => {
    qrCodeDiv.innerHTML = "Failed to generate QR. Please try again.";
    qrInfo.textContent = "";
    downloadBtn.disabled = true;
    copyLinkBtn.disabled = true;
  };
  // Trigger loading (data is already URI-encoded by URLSearchParams)
  img.src = url;
}
