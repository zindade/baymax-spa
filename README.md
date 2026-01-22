# Baymax SPA
Full-stack application inspired by Baymax, focused on health support, education, and care organization. The frontend is a SPA and the backend provides APIs with AI integration, medication info, and support resources.

## Features
- AI chat (text) with optional image support.
- Active ingredient lookup and medication info summaries.
- Medication and appointment scheduler with a local calendar.
- Pharmacy map (Portugal) via OpenStreetMap/Overpass.
- Informational pages and team section.

## Architecture and stack
- Frontend: HTML/CSS/JS (vanilla), Bootstrap, FullCalendar, Leaflet, Dropzone, Marked.
- Backend: Java 17, Spring MVC, Hibernate, PostgreSQL, Spring AI.
- SPA server: Node.js + Express (HTTPS) serving `frontend/`.

## Requirements
- Node.js 18+
- Java 17 + Maven
- Tomcat 7+ (or another WAR-compatible container)
- PostgreSQL
- AI key (OpenAI or compatible)
- Optional: vision server (LLaVA-Med) for image questions

## Configuration
1) Backend
   - Copy `backend/src/main/resources/config.properties.example` to `backend/src/main/resources/config.properties`.
   - Set DB credentials and AI keys.
   - Create the database using the configured name.

2) Frontend (local HTTPS)
   - Generate certificates and place them in `certs/key.pem` and `certs/cert.pem`.
   - The frontend is served via `server.js` (HTTPS on port 5500).

## How to run
### Backend
1) Build the WAR:
   ```bash
   mvn -f backend/pom.xml clean package
   ```
2) Deploy to Tomcat:
   - Copy `backend/target/baymax.war` to Tomcat's `webapps/` directory.
   - The API will be available at `http://localhost:8080/baymax`.

### Frontend
```bash
npm install
npm start
```
Open: `https://localhost:5500`

## Main endpoints
- `POST /baymax/api/ask-baymax` (text)
- `POST /baymax/api/show-baymax` (text + base64 image)
- `POST /baymax/api/medication/active-ingredient`
- `POST /baymax/api/medication/active-ingredient/{ai}`

## Notes
- The map uses Overpass API and requires internet access.
- The image feature depends on a compatible worker (e.g., LLaVA-Med). See `llava-med/README.md`.

## Disclaimer
This project is for educational and research purposes only. Do not use it as a substitute for professional medical advice.
