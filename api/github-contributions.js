export default async function handler(req, res) {
  try {
    const username = process.env.GITHUB_USERNAME;
    const token = process.env.GITHUB_TOKEN;

    if (!username || !token) {
      return res.status(400).json({
        ok: false,
        message: "Missing env vars",
        hasUsername: Boolean(username),
        hasToken: Boolean(token),
      });
    }

    const query = `
      query($login: String!) {
        user(login: $login) {
          contributionsCollection {
            contributionCalendar {
              weeks {
                contributionDays {
                  date
                  contributionCount
                }
              }
            }
          }
        }
      }
    `;

    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { login: username },
      }),
    });

    const json = await response.json();

    // GitHub request failed
    if (!response.ok) {
      return res.status(response.status).json({
        ok: false,
        message: "GitHub GraphQL request failed",
        status: response.status,
        json,
      });
    }

    // GraphQL error
    if (json.errors) {
      return res.status(500).json({
        ok: false,
        message: "GitHub GraphQL returned errors",
        errors: json.errors,
      });
    }

    const days =
      json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks
        ?.flatMap((w) => w.contributionDays) || [];

    if (!days.length) {
      return res.status(200).json({
        ok: true,
        username,
        range: null,
        data: [],
      });
    }

    // ✅ last 12 months (month buckets)
    const now = new Date();
    const start = new Date(now);
    start.setMonth(start.getMonth() - 11);
    start.setDate(1);
    start.setHours(0, 0, 0, 0);

    // filter only last 12 months
    const filtered = days.filter((d) => new Date(d.date) >= start);

    // group by YYYY-MM
    const monthMap = {};
    for (const d of filtered) {
      const dt = new Date(d.date);
      const key = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(
        2,
        "0"
      )}`;

      monthMap[key] = (monthMap[key] || 0) + d.contributionCount;
    }

    // generate last 12 month keys
    const monthKeys = [];
    const iter = new Date(start);

    for (let i = 0; i < 12; i++) {
      const k = `${iter.getFullYear()}-${String(iter.getMonth() + 1).padStart(
        2,
        "0"
      )}`;
      monthKeys.push(k);
      iter.setMonth(iter.getMonth() + 1);
    }

    // build chart data
    const data = monthKeys.map((k) => {
      const [year, mm] = k.split("-");
      const dateObj = new Date(Number(year), Number(mm) - 1, 1);
      const label = dateObj.toLocaleString("en-US", { month: "short" });

      return {
        key: k, // YYYY-MM
        month: label,
        year: Number(year),
        commits: monthMap[k] || 0,
      };
    });

    const range = `${data[0].year}–${data[data.length - 1].year}`;

    return res.status(200).json({
      ok: true,
      username,
      range,
      data,
    });
  } catch (err) {
    console.error("github-contributions error:", err);

    return res.status(500).json({
      ok: false,
      message: "Server error",
      error: String(err),
    });
  }
}
