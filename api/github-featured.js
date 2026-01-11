export default async function handler(req, res) {
  try {
    const username = process.env.GITHUB_USERNAME;
    const token = process.env.GITHUB_TOKEN;

    if (!username) {
      return res.status(400).json({ ok: false, message: "Missing GITHUB_USERNAME" });
    }

    const limit = Number(req.query.limit || 6);

    // Fetch repos
    const reposRes = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    );

    const repos = await reposRes.json();

    if (!reposRes.ok) {
      return res.status(reposRes.status).json({
        ok: false,
        message: "GitHub repos request failed",
        repos,
      });
    }

    // Filter out forks
    const filtered = repos
      .filter((r) => !r.fork)
      .map((r) => ({
        id: r.id,
        name: r.name,
        full_name: r.full_name,
        description: r.description,
        language: r.language,
        stargazers_count: r.stargazers_count,
        forks_count: r.forks_count,
        topics: r.topics || [],
        html_url: r.html_url,
        homepage: r.homepage,
        updated_at: r.updated_at,
        owner: {
          login: r.owner?.login,
          avatar_url: r.owner?.avatar_url,
        },
      }))
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, limit);

    return res.status(200).json({
      ok: true,
      username,
      count: filtered.length,
      repos: filtered,
    });
  } catch (err) {
    console.error("github-featured error:", err);
    return res.status(500).json({
      ok: false,
      message: "Server error",
      error: String(err),
    });
  }
}
