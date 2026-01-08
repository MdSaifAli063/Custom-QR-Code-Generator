# 🎯 Custom QR Code Generator

![Version](https://img.shields.io/badge/version-1.0.0-0078D4)
![License](https://img.shields.io/badge/license-MIT-2b9348)
![API](https://img.shields.io/badge/API-api.qrserver.com-lightgrey)
![Responsive](https://img.shields.io/badge/responsive-yes-orange)


## ✨ Highlights

A simple, beautiful and responsive QR code generator that lets you create, customize, preview and download QR codes instantly.

- Modern, responsive UI with glass/card layout
- Customize size, foreground/background color and error correction (L/M/Q/H)
- Decorative preview background and page background support
- Download QR as PNG, copy direct image link
- Works with api.qrserver.com (no server required)


## 🔍 Demo

- Open `qrcode.html` in your browser to try the app locally.
  
![image](https://github.com/MdSaifAli063/Custom-QR-Code-Generator/blob/d7361ae15e39085ec296de07cd8040a76e1b5eb8/Screenshot%202025-10-10%20011720_edited.png)


## ⚡ Quick Start

1. Open the project folder.
2. Double-click `qrcode.html` (or serve with a static server).
3. Enter any text or URL in the input field.
4. Adjust Size, Colors and Error Correction.
5. Click "Generate" — preview appears on the right.
6. Use "Download" to save the PNG or "Copy Link" to copy the generated image URL.

## 🗂️ Files

- `qrcode.html` — main UI
- `qrcode.css` — styling and responsive layout
- `qrcode.js` — JS logic: build QR URL, preview, download, copy
- `README.md` — this file

## 🎨 Customization Tips

- Change background: edit `background-image` in `qrcode.css` (body or `.preview-bg`) to use your own image.
- Tweak accents: adjust `--accent` in `:root` of `qrcode.css`.
- Add logo or background uploads: enhance `qrcode.js` to compose a canvas (see comments in file for extension points).
- Local hosting: for best reliability (CORS, downloads), serve files with a local static server (e.g., `npx serve`, `python -m http.server`).

## 🛠️ Troubleshooting

- QR not generating? Check your internet connection — the app uses api.qrserver.com.
- Download blocked or blank image? Some browsers restrict cross-origin downloads; try serving files via a static server or use the built-in download behavior (the app falls back to opening the image in a new tab).
- Colors not applied? Ensure hex values are valid (e.g., `#000000`).

## 🔒 Security & Privacy

- No server-side code — all requests go to api.qrserver.com.
- The app does not store or transmit your data except for requests to the QR API when generating images.

## 🤝 Contribute

- Suggestions and improvements are welcome. Fork the project and submit a PR.

## 📄 License

MIT © Md Saif Ali

Thank you — enjoy creating QR codes! 🚀
