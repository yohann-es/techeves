# techeves

tech-aggregator/           # repo root
│
├── backend/               # FastAPI app
│   ├── main.py            # entrypoint
│   ├── routers/           # endpoints (e.g. posts.py)
│   ├── models.py          # SQLAlchemy models
│   ├── schemas.py         # Pydantic schemas
│   ├── db.py              # DB connection
│   ├── requirements.txt
│   └── Dockerfile         # optional for deployment
│
├── frontend/              # React + Vite app
│   ├── src/
│   │   ├── components/    # UI pieces
│   │   ├── pages/         # simple routing
│   │   └── App.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── scraper/               # scraping scripts
│   ├── telegram_scraper.py
│   ├── facebook_scraper.py
│   └── utils.py
│
├── database/              # schema
│   └── schema.sql         # basic SQL create table
│
├── .gitignore
└── README.md
