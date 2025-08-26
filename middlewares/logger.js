import fs from "fs";
const logger = (req, res, next) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const hour = today.getHours();
  const mins = today.getMinutes();
  const secs = today.getSeconds();
  let start = Date.now();

  res.on("finish", () => {
    let end = Date.now();
    let logEvent = `${year}-${month}-${date}T${hour}:${mins}:${secs} ${
      req.method
    } ${req.originalUrl} ${res.statusCode} ${end - start}ms`;
    console.log(logEvent);
    fs.appendFile("app.log", logEvent + "\n", (err) => {
      if (err) {
        console.log("Error writing to log file:", err.message);
      }
    });
  });

  next();
};
// 2025-01-01T10:00  T / 200 2ms
export default logger;
