import { Hono } from "hono";

const app = new Hono().get("/", (c) => c.html(<div>Hello World</div>));

export default app;
