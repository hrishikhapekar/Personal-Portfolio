export default async function handler(req, res) {
  try {
    const username = process.env.GITHUB_USERNAME;
    const token = process.env.GITHUB_TOKEN;

    if (!username) {
      return res.status(400).json({ ok: false, message: "Missing GITHUB_USERNAME" });
    }

    const headers = {
      Accept: "application/vnd.github+json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    // ✅ fetch all pages
    const perPage = 100;
    const maxPages = 10; // supports up to 1000 repos
    let all = [];

    for (let page = 1; page <= maxPages; page++) {
      const resp = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}&sort=updated`,
        { headers }
      );

      const json = await resp.json();

      if (!resp.ok) {
        return res.status(resp.status).json({
          ok: false,
          message: "GitHub request failed",
          json,
        });
      }

      all.push(...json);

      // if < perPage returned => last page
      if (json.length < perPage) break;
    }

    const repos = all
      .filter((r) => !r.fork) // ✅ optional (remove if you want forks also)
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
        created_at: r.created_at,
      }));

    return res.status(200).json({
      ok: true,
      username,
      total: repos.length,
      repos,
    });
  } catch (err) {
    console.error("github-repos-all error:", err);
    return res.status(500).json({
      ok: false,
      message: "Server error",
      error: String(err),
    });
  }
}
