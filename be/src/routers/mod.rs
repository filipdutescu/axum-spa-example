use self::room::RoomRouter;

pub mod room;

pub trait Router {
    fn routes(self) -> axum::Router;
}

pub struct ApiRouter {
    router: axum::Router,
}

impl ApiRouter {
    pub fn new() -> Self {
        ApiRouter {
            router: axum::Router::new().nest("/rooms", RoomRouter::new().routes()),
        }
    }
}

impl Router for ApiRouter {
    fn routes(self) -> axum::Router {
        self.router
    }
}
