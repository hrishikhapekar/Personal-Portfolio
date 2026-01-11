export default async function handler(req, res) {
  try {
    const leetcode = process.env.LEETCODE_USERNAME || null;
    const hackerrank = process.env.HACKERRANK_USERNAME || null;

    if (!leetcode && !hackerrank) {
      return res.status(200).json({
        ok: true,
        message: "No usernames configured",
        data: null,
      });
    }

    const results = {};

    // ✅ LeetCode stats (community endpoint)
    if (leetcode) {
      try {
        const r = await fetch(`https://leetcode-stats-api.herokuapp.com/${leetcode}`, {
          headers: { Accept: "application/json" },
        });
        const j = await r.json();

        results.leetcode = {
          username: leetcode,
          totalSolved: j.totalSolved,
          easySolved: j.easySolved,
          mediumSolved: j.mediumSolved,
          hardSolved: j.hardSolved,
          ranking: j.ranking,
        };
      } catch (e) {
        results.leetcode = { username: leetcode, error: true };
      }
    }

    // ✅ HackerRank (no stable public stats API)
    if (hackerrank) {
      results.hackerrank = {
        username: hackerrank,
        profile: `https://www.hackerrank.com/profile/${hackerrank}`,
        note: "Public stats API not enabled",
      };
    }

    return res.status(200).json({
      ok: true,
      data: results,
    });
  } catch (err) {
    console.error("coding-stats error:", err);
    return res.status(500).json({ ok: false, message: "Server error" });
  }
}
