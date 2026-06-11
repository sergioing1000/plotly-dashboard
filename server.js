import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/charts", (req, res) => {
  res.json({
    sales: {
      labels: ["January", "February", "March", "April", "May"],
      values: [150, 200, 180, 250, 300],
    },
    visits: {
      labels: ["Page A", "Page B", "Page C", "Page D", "Page E"],
      values: [500, 700, 400, 900, 650],
    },
    productivity: {
      labels: ["Team 1", "Team 2", "Team 3", "Team 4", "Team 5"],
      values: [80, 65, 90, 75, 88],
    },
  });
});

export default app;

if (process.env.NODE_ENV !== "test") {
  const PORT = 3000;

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}