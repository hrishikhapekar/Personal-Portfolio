export default async function handler(req, res) {
  try {
    const username = process.env.GITHUB_USERNAME;
    const token = process.env.GITHUB_TOKEN;

    if (!username) {
      return res.status(400).json({ ok: false, message: "Missing GITHUB_USERNAME" });
    }

    const url = `https://api.github.com/users/${username}`;

    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github+json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const json = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        ok: false,
        message: "GitHub request failed",
        json,
      });
    }

    // ✅ public repo count directly from GitHub profile
    return res.status(200).json({
      ok: true,
      username,
      projects: json.public_repos, // public repos count
    });
  } catch (err) {
    console.error("github-repos error:", err);
    return res.status(500).json({
      ok: false,
      message: "Server error",
      error: String(err),
    });
  }
}
