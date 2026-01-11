import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), "private", "Resume.pdf");

    if (!fs.existsSync(filePath)) {
      return res.status(404).send("Resume not found");
    }

    const fileBuffer = fs.readFileSync(filePath);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="Resume.pdf"');
    res.setHeader("Content-Length", fileBuffer.length);

    return res.status(200).send(fileBuffer);
  } catch (err) {
    console.error("Resume API error:", err);
    return res.status(500).send("Server error");
  }
}
