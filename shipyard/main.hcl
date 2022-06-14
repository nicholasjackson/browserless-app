variable "local_test" {
  default = false
}

container "browserless" {
  network {
    name = "network.local"
  }

  image {
    name = "browserless/chrome:latest"
  }

  env {
    key   = "MAX_CONCURRENT_SESSIONS"
    value = "10"
  }

  port {
    local  = "3000"
    host   = "3000"
    remote = "3000"
  }
}


variable "cn_network" {
  default = "local"
}

variable "cn_nomad_cluster_name" {
  default = "nomad_cluster.local"
}

variable "cn_nomad_client_nodes" {
  default = 0
}

module "consul_nomad" {
  source = "github.com/shipyard-run/blueprints?ref=d9446bfc97759e66b82b1fed60fd70c94ab98238/modules//consul-nomad"
  #source = "/home/nicj/go/src/github.com/shipyard-run/blueprints/modules/consul-nomad"
}

container "app" {
  disabled = var.local_test


  network {
    name = "network.local"
  }

  image {
    name = "nicholasjackson/browserless-app:latest"
  }

  env {
    key   = "BROWSERLESS"
    value = "ws://browserless.container.shipyard.run:3000"
  }

  port {
    local  = "8080"
    host   = "8080"
    remote = "8080"
  }
}

network "local" {
  subnet = "10.0.0.0/16"
}
