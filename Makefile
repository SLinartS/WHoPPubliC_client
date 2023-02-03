build:
	docker build . -t whoclient
run-rm:
	docker run -d -p 3000:3000 --rm  --env-file ./.env --name whoclient whoclient
run:
	docker run -d -p 3000:3000  --env-file ./.env --name whoclient whoclient
stop:
	docker stop whoclient
image-rm:
	docker rmi whoclient