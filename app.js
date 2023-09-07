const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));

app.get("/information", (req, res) => {
  const { slackName, track } = req.query;

  if (!slackName || !track) {
    return res.status(400).json({ error: "Missing required parameters." });
  }


  const currentDay = new Date().toLocaleString("en-US", { weekday: "long" });
  const utcTime = new Date().toISOString();

   const githubFileUrl =
     "https://github.com/adefoluso/HNG-Stage1.git/repo/blob/main/app.js";
   const githubRepoUrl = "https://github.com/adefoluso/HNG-Stage1.git";

   /Users/admin/Desktop/HNG/stage_1/app.js


   res.status(200).json({
     slackName,
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
