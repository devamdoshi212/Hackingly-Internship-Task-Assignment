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

    let count = 0;

    while (!visitedPages.has(searchTerm)) {
      visitedPages.add(searchTerm);
      if (
        searchTerm.split("https://en.wikipedia.org")[1] === "/wiki/Philosophy"
      ) {
        console.log("Reached Philosophy page!");
        break;
      }
      const searchResponse = await fetch(searchTerm);
      if (!searchResponse.ok) {
        return res.status(searchResponse.status).json({
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
        console.log(searchTerm);
      }
      count++;
    }

    res.status(200).json({
      data: {
        count: count,
        visitedPages: Array.from(visitedPages),
      },
      message: "Success",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

module.exports = {
  search,
};
