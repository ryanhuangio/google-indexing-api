var request = require("request");
var { google } = require("googleapis");
var key = require("./service_account.json");
var fs = require("fs");

const jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  ["https://www.googleapis.com/auth/indexing"],
  null
);

jwtClient.authorize(function (err, tokens) {
  if (err) {
    console.log(err);
    return;
  }

  // Function to process URLs from a file
  function processURLs(filename, type) {
    fs.readFile(filename, "utf8", function (err, data) {
      if (err) {
        console.error("Error reading file:", filename, err);
        return;
      }

      const urls = data.split(/\r?\n/);

      urls.forEach((url) => {
        if (url) {
          let options = {
            url: "https://indexing.googleapis.com/v3/urlNotifications:publish",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            auth: { bearer: tokens.access_token },
            json: {
              url: url,
              type: type,
            },
          };
          request(options, function (error, response, body) {
            if (error) {
              console.error("Error for URL:", url, error);
              return;
            }
            console.log(`Response for URL (${type}):`, url, body);
          });
        }
      });
    });
  }

  // Process URLs to index
  processURLs("UrlsToIndex.txt", "URL_UPDATED");

  // Process URLs to remove
  processURLs("UrlsToRemove.txt", "URL_DELETED");
});
