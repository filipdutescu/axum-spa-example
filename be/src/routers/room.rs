use std::{
    collections::HashMap,
    fmt::Display,
    sync::{Arc, Mutex},
};

use axum::{extract, response::IntoResponse, routing::post, Json};
use axum_debug::debug_handler;
use serde::{Deserialize, Serialize};

use crate::resp::Response;

use super::Router;

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
struct JoinRoomData {
    pub username: String,
    pub room_key: String,
}

impl Display for JoinRoomData {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(
            f,
            "username: {}, room_key: {}",
            self.username, self.room_key
        )
    }
}

pub struct RoomRouter {
    rooms: Arc<Mutex<HashMap<String, Vec<String>>>>,
    router: axum::Router,
}

impl RoomRouter {
    pub fn new() -> Self {
        RoomRouter {
            rooms: Arc::new(Mutex::new(HashMap::new())),
            router: axum::Router::new().route("/", post(RoomRouter::join_handler)),
        }
    }

    #[debug_handler()]
    async fn join_handler(
        extract::Json(join_room_data): extract::Json<JoinRoomData>,
    ) -> impl IntoResponse {
        tracing::debug!("Received: {}", join_room_data);
        Json(Response {
            code: 0,
            message: "OK".to_string(),
        })
    }
}

impl Router for RoomRouter {
    fn routes(self) -> axum::Router {
        self.router
    }
}
