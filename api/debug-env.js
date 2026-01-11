export default function handler(req, res) {
  res.status(200).json({
    hasUsername: Boolean(process.env.GITHUB_USERNAME),
    hasToken: Boolean(process.env.GITHUB_TOKEN),
    username: process.env.GITHUB_USERNAME ? "SET" : "MISSING",
    token: process.env.GITHUB_TOKEN ? "SET" : "MISSING",
  });
}
