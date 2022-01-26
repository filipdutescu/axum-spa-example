mod routers;

use std::net::SocketAddr;

use crate::routers::{ApiRouter, Router};

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();

    let app = axum::Router::new().nest("/api", ApiRouter::new().routes());
    let addr = SocketAddr::from(([0, 0, 0, 0], 8080));

    tracing::info!("Server listening on {}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}
