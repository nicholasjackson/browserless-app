container "browserless" {
  network {
    name = "network.local"
  }

  image {
    name = "browserless/chrome:latest"
  }

  env {
    key = "MAX_CONCURRENT_SESSIONS"
    value = "10"
  }
  
  port {
    local = "3000"
    host = "3000"
    remote = "3000"
  }
}

container "app" {
  network {
    name = "network.local"
  }

  image {
    name = "nicholasjackson/browserless-app:latest"
  }

  env {
    key = "BROWSERLESS"
    value = "ws://browserless.container.shipyard.run:3000"
  }

  port {
    local = "8080"
    host = "8080"
    remote = "8080"
  }
}

network "local" {
    subnet = "10.0.0.0/16"
}
