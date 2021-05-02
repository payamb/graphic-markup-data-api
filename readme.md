## Setup

run `npm ci && npm test` to install the dependencies and run the tests.

run `npm run start:dev` to start the local server on http://localhost:8280

## API

The `/api/v1/markup/:id` endpoint accepts GET requests with these possible query parameteres: 

| Parameter | Description | Example |
| --- | --- | --- |
| sort | Sort based on in_frame and out_frame | `sort=in_frame:asc`, `sort=out_frame:desc` |
| location | Filter the results based on content.location | `location=Centre` |
| page, limit | To paginate the results | `page=1&limit=10` |


Any requests to `/api/` must contain `x-auth` header to authenticate.

Example:

```
curl -i -H "x-auth: ultra-secure-token" "http://localhost:8280/api/v1/markup/1?location=Centre&sort=in_frame:asc&page=4&limit=5"
```