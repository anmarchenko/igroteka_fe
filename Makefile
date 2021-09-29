help:
	@echo "Makefile for igroteka"
build:
	yarn build
	docker build -f Dockerfile -t altmer/igroteka:latest .
	docker push altmer/igroteka
deploy: build
	make -C $(DEPLOY_PATH) igroteka
