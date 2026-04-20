# Development Guide - Mondal Travels & Co

Welcome to the development folder for the Mondal Travels & Co website. This guide will help you understand how the site is structured and how you can edit it later.

## Quick Start
To run the website on your local computer:
1. Open a terminal in this folder.
2. Run `npm install` (only needs to be done once).
3. Run `npm run dev`.
4. Open the link provided (usually `http://localhost:5173`).

---

## 🛠 How to Edit Key Parts

### 1. Changing the Brand Name
The name "Mondal Travels & Co" is located in several files:
- **Main Header & Footer**: [App.jsx](file:///c:/Users/dell/Downloads/mondal%20and%20co/web-app/src/App.jsx)
- **Cinematic Journey Title**: [Hero.jsx](file:///c:/Users/dell/Downloads/mondal%20and%20co/web-app/src/components/Hero.jsx)
- **Browser Tab Name**: [index.html](file:///c:/Users/dell/Downloads/mondal%20and%20co/web-app/index.html)

### 2. Adjusting the Bus Animation
The 3D travel animation is entirely controlled in [Hero.jsx](file:///c:/Users/dell/Downloads/mondal%20and%20co/web-app/src/components/Hero.jsx).
- **Speeds (KM/H)**: Modify the `journeyStates` array at the top of the file.
- **Images**: If you have new bus images, place them in the `/public` folder and update the `busImage` path in `journeyStates`.

### 3. Updating the Fleet
To add or change the vehicles listed on the site:
- Edit [Fleet.jsx](file:///c:/Users/dell/Downloads/mondal%20and%20co/web-app/src/components/Fleet.jsx). You can change the "Seater" counts, descriptions, and icons here.

### 4. Customizing Colors & Glows
All the neon effects and colors are defined in:
- [index.css](file:///c:/Users/dell/Downloads/mondal%20and%20co/web-app/src/index.css) (Global variables)
- [Hero.css](file:///c:/Users/dell/Downloads/mondal%20and%20co/web-app/src/components/Hero.css) (Road and background effects)

---

## 📂 Folder Structure
- `/src/components`: Contains the main sections (Hero, Fleet, JourneyPath).
- `/public`: Contains all images, including the branded buses.
- `index.html`: The main entry point.

---
**Established 1999 • Mondal Travels & Co**
