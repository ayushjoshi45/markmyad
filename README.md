# 👟 Sneaker Studio – AI Powered Sneaker Customizer

Sneaker Studio is a modern **e-commerce style web application** that allows users to **customize sneakers in real time**, save their designs, and get **AI-based style suggestions**.  
The project focuses on **clean UI, smooth UX, and scalable frontend architecture** using **Next.js**.

---

## 🚀 Features

### 🏠 Home
- Browse available sneaker models
- Search sneakers by name (debounced search)
- Clean, responsive e-commerce UI

### 🎨 Sneaker Customizer
- Customize:
  - Upper color
  - Sole color
  - Logo color
- Preset color swatches + **custom color picker**
- Material selection (Canvas / Leather)
- **Live preview** with smooth UI updates
- **Zoom in / zoom out / reset zoom**
- Mouse wheel zoom support

### 🤖 AI Style Suggestions
- Ask AI questions like:
  - *“Which colors are good for summer?”*
  - *“Suggest a premium sneaker look”*
- Gemini AI provides **human-like design advice**
- AI logic handled securely via backend API
- AI suggestions are optional and user-controlled

### 💾 My Designs
- Save customized sneaker designs
- View all saved designs in a gallery
- Real preview rendering of saved designs
- Edit existing designs
- Delete designs

### 🔐 Authentication
- Login & Signup system
- Token-based authentication
- Protected routes (My Designs, Customize)

### 📱 Responsive Design
- Fully responsive (desktop, tablet, mobile)
- Mobile-friendly navbar with menu toggle
- Premium dark UI with glassmorphism navbar

---

## 🛠 Tech Stack

### Frontend
- **Next.js (App Router)**
- **React**
- **Tailwind CSS**
- Client-side state using React hooks

### Backend
- **Next.js API Routes**
- REST APIs for:
  - Authentication
  - Saving & fetching designs
  - AI suggestions

### AI Integration
- **Google Gemini API**
- Secure backend integration
- Prompt-based natural language suggestions

---

## 📂 Project Structure

