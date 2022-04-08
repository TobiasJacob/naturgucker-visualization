FROM ubuntu

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends python3 python3-pip git curl make

RUN useradd -ms /bin/bash vscode

ENV NODE_VERSION=16.13.0

USER vscode

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/home/vscode/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/vscode/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"

COPY requirements.txt /requirements.txt
RUN pip install -r /requirements.txt

WORKDIR /workdir
