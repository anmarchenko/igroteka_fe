help:
	@echo "Makefile for igroteka"
compile:
	yarn build
	docker build -f Dockerfile -t altmer/igroteka:latest .
	docker push altmer/igroteka
deploy: compile
	make -C $(DEPLOY_PATH) igroteka
