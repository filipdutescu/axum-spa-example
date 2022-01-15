use std::net::SocketAddr;

use axum::{routing::get, Router};
use axum_debug::debug_handler;

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();

    let app = Router::new().route("/api", get(greet));
    let addr = SocketAddr::from(([0, 0, 0, 0], 8080));

    tracing::info!("Server listening on {}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

#[debug_handler]
async fn greet() -> &'static str {
    "Hello World!"
}
