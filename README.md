# 🧠 Multimodal UI Generator for eCommerce

> 🎯 An AI-powered tool that generates brand-specific landing pages using text prompts, brand guidelines, and product images — export-ready for React and Shopify!

---

## 💡 Problem Statement

Creating brand-aligned landing pages and product showcases is time-consuming and design-heavy. eCommerce teams often struggle to reflect their brand tone, target audience, and product features while iterating quickly.

---

## 🛠️ Hackathon Challenge

Build an AI system that:

- Accepts **multimodal inputs**: product images, text prompts, brand fonts/colors
- Generates **responsive static & animated UIs** that match the brand tone
- Allows **editing & previewing** of generated designs
- Enables **code export** in **React** or **Shopify-compatible** format

---

## 🌟 Features

- 🧩 **Drag & Drop UI Generator** using product images + brand inputs
- ✍️ **Prompt-to-UI Generator** (text-based UI generation)
- 🎨 Supports **brand colors, fonts, and product categories**
- ⚡ **Instant code export**: Download React JSX code
- 🧪 **Live Preview** with optional editing
- 🛍️ Optional: Shopify-compatible HTML output (Liquid-ready)
- 🧠 Powered by open-source AI/ML models (no paid APIs!)

---

## 🧑‍💻 Tech Stack

| Layer         | Tech                                     |
|--------------|------------------------------------------|
| Frontend      | React, Tailwind CSS, Vite                |
| Backend (optional) | Node.js / Express (or fully client-side) |
| AI/ML Models  | 🤗 Transformers, BLIP/CLIP, LLMs (e.g., Hugging Face) |
| Code Export   | JSX Template Engine + FileSaver + JSZip |
| Optional ML   | scikit-learn / TensorFlow.js / ONNX      |

---

## 🛣️ Project Roadmap

### ✅ Phase 1: Input UI

- [x] Upload Product Images
- [x] Add Brand Guidelines (colors, fonts)
- [x] Text Prompt Input

### ✅ Phase 2: AI UI Generator

- [x] Prompt + Product → Generate layout
- [x] Render design preview
- [x] Maintain brand consistency

### ✅ Phase 3: Editor + Export

- [x] Visual preview with edit options
- [x] Export to React JSX
- [x] Export to Shopify-compatible HTML (optional)
- [x] Download as ZIP

### ✅ Phase 4: Polish & Bonus

- [x] Responsive design
- [x] Loading speed optimization
- [x] Open-source & hosted demo

---

## 📦 How to Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/your-username/multimodal-ui-generator.git

# 2. Navigate into the directory
cd multimodal-ui-generator

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev
```
