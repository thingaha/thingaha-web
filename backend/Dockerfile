FROM ubuntu:20.04

COPY ./requirements.txt /app/requirements.txt
WORKDIR /app
RUN apt-get update -y && apt-get install -y python3-pip libsasl2-dev python3-dev libldap2-dev libssl-dev libsnmp-dev libpq-dev
RUN pip3 install --no-cache-dir -r requirements.txt
ENV FLASK_ENV docker
ENV SCRIPT_ENV docker
ENV FLASK_APP app.py

WORKDIR /app/bin

ENTRYPOINT ["/bin/sh", "./docker_entry_point.sh"]

EXPOSE 5000
