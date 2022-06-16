docker_repository := "nicholasjackson/browserless-app"
docker_version := "0.1.0"

build:
	docker build -t nicholasjackson/browserless-app:latest .

push: build
	docker push nicholasjackson/browserless-app:latest

env:
	shipyard run --var="local_test=true" ./shipyard
