import { Hono } from "hono";

import { AddTodo, Item, renderer, Todo } from "./components";
import { D1Database } from "@cloudflare/workers-types";

type Bindings = {
	DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>()
	.get("*", renderer)
	.get("/", async (c) => {
		const { results } = await c.env.DB.prepare(
			"SELECT id, title FROM todo;",
		).all<Todo>();
		const todos = results;
		return c.render(
			<div>
				<AddTodo />
				{todos.map((todo) => (
					<Item id={todo.id} title={todo.title} />
				))}
				<div id="todo" />
			</div>,
		);
	});

export default app;
