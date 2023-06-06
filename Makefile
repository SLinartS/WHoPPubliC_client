drebuild: dstop build drun

dbuild:
	docker build . -t whoclient

drun:
	docker run -d -p 80:3000 --rm --name whoclient whoclient

drunv:
	docker run -d -p 80:3000 -v ./build:/app/build --rm --name whoclient whoclient

dstop:
	docker stop whoclient

image-rm:
	docker rmi whoclient