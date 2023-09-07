const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

const app = express();

app.use(morgan("dev"));

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/api", (req, res) => {
  const { slack_name, track } = req.query;

  if (!slack_name || !track) {
    return res.status(400).json({ error: "Missing required parameters." });
  }

  const currentDay = new Date().toLocaleString("en-US", { weekday: "long" });
  const currentUTCDate = new Date();
  const utcTime = new Date(
    currentUTCDate.getTime() - currentUTCDate.getTimezoneOffset() * 60000
  ).toISOString();


  const githubFileUrl ="https://github.com/adefoluso/HNG-Stage1/blob/main/app.js";
  const githubRepoUrl = "https://github.com/adefoluso/HNG-Stage1/tree/main";

  res.status(200).json({
    slack_name,
    current_day: currentDay,
    utc_time: utcTime,
    track,
    github_file_url: githubFileUrl,
    github_repo_url: githubRepoUrl,
    status_code: 200,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
