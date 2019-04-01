FROM node:10-slim

LABEL version="1.0.0"
LABEL repository="https://github.com/ffflorian/1password-linux/"
LABEL homepage="https://github.com/ffflorian/1password-linux"
LABEL maintainer="ffflorian"

LABEL com.github.actions.name="GitHub Action for node with bzip2"
LABEL com.github.actions.description="Adds bzip2 to the Node.js image"
LABEL com.github.actions.icon="package"
LABEL com.github.actions.color="yellow"

RUN apt-get update && \
    apt-get install --no-install-recommends -y \
        bzip2 && \
    apt-get clean -y && \
    rm -rf /var/lib/apt/lists/*
