# Build app

FROM rust:alpine as build-artifacts

WORKDIR /app
RUN apk add musl-dev

COPY . .
RUN cargo install --path "." --target=x86_64-unknown-linux-musl

# Serve app

FROM alpine:latest
ARG RUST_LOG=Debug
ENV RUST_LOG=$RUST_LOG
EXPOSE 8080

COPY --from=build-artifacts /usr/local/cargo/bin/* /usr/local/bin/
ENTRYPOINT ["/usr/local/bin/axum-spa-example-be"]
