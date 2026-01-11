export default async function handler(req, res) {
  try {
    const username = process.env.GITHUB_USERNAME;
    const token = process.env.GITHUB_TOKEN;

    if (!username) {
      return res.status(400).json({ ok: false, message: "Missing GITHUB_USERNAME" });
    }

    // ✅ query params
    const per_page = 100;
    const maxPages = 3; // 3 pages * 100 commits = 300 commits (enough for a graph)

    let commits = [];

    for (let page = 1; page <= maxPages; page++) {
      const url = `https://api.github.com/users/${username}/events/public?per_page=${per_page}&page=${page}`;

      const resp = await fetch(url, {
        headers: {
          "Accept": "application/vnd.github+json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (!resp.ok) {
        const text = await resp.text();
        return res.status(resp.status).json({ ok: false, message: text });
      }

      const events = await resp.json();

      // pick push events only
      const pushEvents = events.filter((e) => e.type === "PushEvent");

      // count commits from each push
      for (const ev of pushEvents) {
        const commitCount = ev.payload?.commits?.length || 0;
        const date = ev.created_at;

        if (commitCount > 0) {
          commits.push({ date, count: commitCount });
        }
      }
    }

    // ✅ Group by month
    const grouped = {};
    for (const c of commits) {
      const d = new Date(c.date);
      const month = d.toLocaleString("en-US", { month: "short" });
      grouped[month] = (grouped[month] || 0) + c.count;
    }

    // ✅ enforce month order
    const monthOrder = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    const chartData = monthOrder
      .filter((m) => grouped[m] !== undefined)
      .map((m) => ({ month: m, commits: grouped[m] }));

    return res.status(200).json({
      ok: true,
      username,
      total_commits: commits.reduce((a, b) => a + b.count, 0),
      data: chartData,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, message: "Server error" });
  }
}
