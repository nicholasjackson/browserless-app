build:
	docker build -t nicholasjackson/browserless-app:latest .

push: build
	docker push nicholasjackson/browserless-app:latest
