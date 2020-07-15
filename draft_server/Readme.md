# Draft Server

Draft server is for generating a simple draft server which returns hard-coded values of api endpoints.

The purpose of this server is to parallelize frontend and backend while serving as an example api endpoint for both frontend and backend to refer to.

To add new GET endpoint, just add a new json file with endpoint name in `sample_data` folder and add the endpoint according to examples in index.js.

General api structure is every response starts with a data attribute. Eg.

```javascript
{
  "data": /* actual data here */
}
```

To add non-GET endpoint, add endpoint to index.js with post route. Within the handler, write a comment saying what it should do in server.
Then, return a canned sample response.
