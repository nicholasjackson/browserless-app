# Browserless example

## Start the app

```
shipyard run .
```


## Generate an image

```shell
curl mince.demo.gs:8080/image?url=https%3A%2F%2Fhashiconf.com&height=1920&width=1920 -o github.png
```

## Parameters

**url** - Url to process, must be url encoded
**height** - Height of the canvas to use when processing the URL
**width** - Width of the canvas to use when processing the URL
