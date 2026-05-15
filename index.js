export default {
  async fetch(request) {
    const url = new URL(request.url);

    // -----------------------------
    // MARKET DATA
    // -----------------------------
    let models = [
      {
        name: "Toyota Harrier",
        category: "SUV",
        momentum: 82,
        demand: 91,
      },
      {
        name: "Mazda CX-5",
        category: "SUV",
        momentum: 74,
        demand: 85,
      },
      {
        name: "Subaru Forester",
        category: "SUV",
        momentum: 68,
        demand: 72,
      },
      {
        name: "Toyota Prado",
        category: "SUV",
        momentum: 93,
        demand: 97,
      },
      {
        name: "Nissan X-Trail",
        category: "SUV",
        momentum: 57,
        demand: 60,
      },
    ];

    // -----------------------------
    // SIMULATE MARKET MOVEMENT
    // -----------------------------
    models = models.map((m) => {
      const noise = (Math.random() - 0.5) * 10;

      const momentum = Math.max(
        0,
        Math.min(100, m.momentum + noise)
      );

      const trend = momentum - m.momentum;

      return {
        ...m,
        momentum,
        trend,
      };
    });

    // Sort highest momentum first
    models.sort((a, b) => b.momentum - a.momentum);

    // -----------------------------
    // API ROUTE
    // -----------------------------
    if (url.pathname === "/api/models") {
      return Response.json({
        updated: Date.now(),
        models,
      });
    }

    // -----------------------------
    // DASHBOARD HTML
    // -----------------------------
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>KE Import Radar</title>

      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <style>
        body {
          margin: 0;
          background: #000;
          color: white;
          font-family: Arial;
          padding: 20px;
        }

        .header {
          margin-bottom: 30px;
        }

        .header h1 {
          margin: 0;
          font-size: 32px;
        }

        .sub {
          color: #888;
        }

        .ticker {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          padding: 12px 0;
          margin-bottom: 25px;
          white-space: nowrap;
          color: #00ff88;
          border-bottom: 1px solid #222;
        }

        .card {
          background: #111;
          border: 1px solid #222;
          border-radius: 16px;
          padding: 18px;
          margin-bottom: 14px;
        }

        .top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .green {
          color: #00ff88;
        }

        .red {
          color: #ff5555;
        }

        .meta {
          color: #888;
          font-size: 14px;
        }

        .score {
          font-size: 30px;
          font-weight: bold;
        }

        a {
          color: cyan;
        }
      </style>
    </head>

    <body>

      <div class="header">
        <h1>🚗 KE Import Radar</h1>
        <p class="sub">
          Kenya Car Import Intelligence Dashboard
        </p>

        <a href="/api/models">Open JSON API</a>
      </div>

      <div class="ticker">
        ${models.map(
          (m) => `
            <span>
              ${m.name}
              ${m.trend > 0 ? "▲" : "▼"}
              ${m.trend.toFixed(1)}
            </span>
          `
        ).join("")}
      </div>

      ${models.map(
        (m, i) => `
          <div class="card">

            <div class="top">

              <div>
                <h2>#${i + 1} ${m.name}</h2>
                <div class="meta">
                  ${m.category}
                </div>
              </div>

              <div class="${
                m.trend > 0 ? "green" : "red"
              }">
                ${m.trend > 0 ? "RISING" : "FALLING"}
              </div>

            </div>

            <hr style="border-color:#222"/>

            <div class="score">
              ${m.momentum.toFixed(1)}
            </div>

            <div class="meta">
              Demand Index: ${m.demand}
            </div>

            <p>
              ${
                m.trend > 0
                  ? "Import activity expected to increase."
                  : "Market demand cooling."
              }
            </p>

          </div>
        `
      ).join("")}

    </body>
    </html>
    `;

    return new Response(html, {
      headers: {
        "content-type": "text/html;charset=UTF-8",
      },
    });
  },
};
