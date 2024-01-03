const cheerio = require("cheerio");
// const fetch = require("node-fetch");

async function search(req, res) {
  try {
    let searchTerm = req.body.searchTerm;
    if (!searchTerm) {
      return res.status(400).json({
        message: "Missing searchTerm in the request body",
      });
    }

    let visitedPages = new Set();
    let unableToGetPath = 0;
    let count = 0;

    while (searchTerm !== "https://en.wikipedia.org/wiki/Philosophy") {
      const searchResponse = await fetch(searchTerm);
      if (!searchResponse.ok) {
        return res.json({
          status: 500,
          message: "Failed to retrieve data from Wikipedia",
        });
      }
      const html = await searchResponse.text();
      const $ = cheerio.load(html);
      //   const firstWikiLink = $('#bodyContent p a[href^="/wiki/"]')
      //     .first()
      //     .attr("href");
      const firstWikiLink = $('#bodyContent p a[href^="/wiki/"]')
        .filter((index, element) => !$(element).parents("span").length)
        .first()
        .attr("href");

      if (firstWikiLink) {
        searchTerm = `https://en.wikipedia.org${firstWikiLink}`;
      }
      if (visitedPages.has(searchTerm)) {
        unableToGetPath = 1;
        break;
      }
      visitedPages.add(searchTerm);

      count++;
    }

    if (unableToGetPath) {
      res.json({
        status: 201,
        message: "Unable to get path to reach philosophy page.",
      });
    } else {
      res.json({
        status: 200,
        data: {
          count: count,
          visitedPages: Array.from(visitedPages),
        },
        message: "Success",
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}

module.exports = {
  search,
};
