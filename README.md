#### API Central

1. Set blob storage connection string in your env:

```
export API_CENTRAL_CONN="DefaultEndpointsProtocol=https;....."
```

2. Push a file to API Central do

```
npx api-central push my-service ./swagger.json

# or (default branch = current git branch)
npx api-central push my-service ./swagger.json
```


3. Pull an api file from API Central

`dev` is the fallback branch when there in no schema in API Central for the current branch

```
npx api-central pull my-service ./out-schema.json

# or
npx api-central pull mybranch ./out-schema.json

```
