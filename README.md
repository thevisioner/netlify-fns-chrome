# Run Puppeteer in Netlify Functions

## Function bundling

Use the `netlify.toml` to flag "chrome-aws-lambda" as an external node module for functions that uses it.

```toml
# Flags "chrome-aws-lambda" as an external node module for 'generate' function.
[functions.generate]
  external_node_modules = ["chrome-aws-lambda"]
```

## Runtime version

In the Netlify UI, set the environment variable `AWS_LAMBDA_JS_RUNTIME` to `'nodejs14.x'`. Note that this environment variable must be set using the Netlify UI, CLI, or API, and not with a Netlify configuration file (netlify.toml). See [Netlify Docs](https://docs.netlify.com/functions/optional-configuration/#node-js-version-for-runtime) detailed information.
