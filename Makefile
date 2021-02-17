help:
	@echo "Makefile for igroteka"
compile:
	yarn build
deploy:
	make -C $(DEPLOY_PATH) igroteka
