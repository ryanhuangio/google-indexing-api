# Google Indexing API - Mass Update or Remove

1. Install dependencies `npm install`
2. Go through the Indexing API prerequisites https://developers.google.com/search/apis/indexing-api/v3/prereqs#create-service-account
3. Download your service account JSON and rename it `service_account.json`
4. Add your list of urls to `UrlsToIndex.txt` or `UrlsToRemove.txt`
5. You can also run `node SitemapToUrls.js` to generate the `UrlsToIndex.txt`
6. Run `node GoogleIndexingApi.js`

### Docker

1. To run in a Docker container, run `sh StartDocker.sh`
2. Same steps as above.
