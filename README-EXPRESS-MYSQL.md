# Titus Management Library — Express + MySQL

## 1. Create the database
1. Open MySQL Workbench or the MySQL command line.
2. Run the SQL in `server/schema.sql`. It creates `titus_library` and the initial admin account.

Initial login: membership ID `Tsotetsi`, password `Tite@2025`. Change this password before real use.

## 2. Start the Express API
Open a terminal in the project folder:

```powershell
cd server
npm install
copy .env.example .env
```

Edit `server/.env` and set `DB_PASSWORD` to your MySQL root password. Then run:

```powershell
npm run dev
```

The API runs at `http://localhost:5000`. Check `http://localhost:5000/api/health` to confirm the database connection.

## 3. Start React
Open a second terminal in the project folder:

```powershell
npm install
npm run dev
```

Open the Vite URL shown in the terminal (usually `http://localhost:5173`). React loads and saves books, users, and transactions through the Express API to MySQL.

## API routes
- `GET /api/books`, `PUT /api/books`
- `GET /api/users`, `PUT /api/users`
- `GET /api/transactions`, `PUT /api/transactions`
- `GET /api/health`

Note: this is a learning/demo backend. It stores each collection as JSON and the current login check is performed in the React client. For a public/production system, use server-side authentication, hashed passwords, authorization middleware, and individual relational tables with transactions.
