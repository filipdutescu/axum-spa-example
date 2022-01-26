mod resp;
mod routers;

use std::net::SocketAddr;

use axum::http::header::{ACCEPT, CONTENT_TYPE};
use tower_http::cors::{any, CorsLayer, Origin};

use crate::routers::{ApiRouter, Router};

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();

    let origins = vec![
        "http://localhost:4200".parse().unwrap(),
        "http://frontend:80".parse().unwrap(),
    ];
    let app = axum::Router::new()
        .nest("/api", ApiRouter::new().routes())
        .layer(
            CorsLayer::new()
                .allow_origin(Origin::list(origins))
                .allow_methods(any())
                .allow_headers(vec![CONTENT_TYPE, ACCEPT]),
        );
    let addr = SocketAddr::from(([0, 0, 0, 0], 8080));

    tracing::info!("Server listening on {}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}
