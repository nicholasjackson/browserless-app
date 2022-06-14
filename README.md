# Browserless example

## Start the app

```
shipyard run ./shipyard
```

## Generate an image

```shell
curl mince.demo.gs:8080/image?url=https%3A%2F%2Fhashiconf.com&height=1920&width=1080 -o github.png
```

## Parameters

**url** - Url to process, must be url encoded  
**height** - Height of the canvas to use when processing the URL, default `1920`
**width** - Width of the canvas to use when processing the URL, default `1080`  
**wait_for** - Expected text to be contained in the DOM. Single page apps load in multiple stages, when `wait_for` is specified browserless will wait beyond the `document.ready` signal and will only return once the dom contains this text
**cache** - Duration in seconds to cache responses for, default value is `0`, no cache