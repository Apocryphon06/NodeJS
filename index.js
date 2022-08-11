const fs = require("fs");
const http = require("http");

//Server

const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCT_NAME%}/g, product.title);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%RATING%}/g, product.rating);
  output = output.replace(/{%CATEGORY%}/g, product.category);
  output = output.replace(/{%ID%}/g, product.id);
  return output;
};

const tempOverview = fs.readFileSync(
  `${__dirname}/template-overview.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/template-product.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(`${__dirname}/template-card.html`, "utf-8");

const data = fs.readFileSync(`${__dirname}/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;
  //Overview
  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });

    const cardsHtml = dataObj.products
      .map((el) => replaceTemplate(tempCard, el))
      .join("");

    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);
  }
  //Products
  else if (pathName === "/product") {
    res.end("Products");
  }
  //API
  else if (pathName === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);
  }
  //Not found
  else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("Page not found");
  }
});

server.listen(8000, "localhost", () => {
  console.log("Listening to requests on port 8000.");
});
