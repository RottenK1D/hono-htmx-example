import { Hono } from "hono";
import { html } from "hono/html";

const app = new Hono();

interface SiteData {
	title: string;
	description: string;
	image: string;
	children?: any;
}

const Layout = (props: SiteData) => html`
<html>
<head>
  <meta charset="UTF-8">
  <title>${props.title}</title>
  <meta name="description" content="${props.description}">
  <head prefix="og: http://ogp.me/ns#">
  <meta property="og:type" content="article">
  <!-- More elements slow down JSX, but not template literals. -->
  <meta property="og:title" content="${props.title}">
  <meta property="og:image" content="${props.image}">
  <script src="https://unpkg.com/htmx.org@1.9.10"></script>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  ${props.children}
</html>
`;

type Todo = {
	id: number;
	text: string;
	completed: boolean;
};

const db: Todo[] = [
	{ id: 1, text: "Buy groceries", completed: false },
	{ id: 2, text: "Walk the dog", completed: true },
	{ id: 3, text: "Do laundry", completed: false },
];

const Content = (props: { siteData: SiteData }) => (
	<Layout {...props.siteData}>
		<div
			class="flex flex-col items-center justify-center h-creeen"
			hx-get="/todos"
			hx-trigger="load"
			hx-swap="innerHTML"
		/>
	</Layout>
);

const TodoItem = ({ text, completed, id }: Todo) => {
	return (
		<div class="flex space-x-3">
			<p>{text}</p>
			<input
				type="checkbox"
				checked={completed}
				hx-post={`/todos/${id}`}
				hx-target="closest div"
				hx-swap="outerHTML"
			/>
			<button
				class="text-red-500"
				type="button"
				hx-delete={`/todos/${id}`}
				hx-swap="outerHTML"
				hx-target="closest div"
			>
				X
			</button>
		</div>
	);
};

const TodoList = ({ todos }: { todos: Todo[] }) => {
	return (
		<div>
			{todos.map((todo) => (
				<TodoItem {...todo} />
			))}
		</div>
	);
};

app.get("/", (c) => {
	const props = {
		name: "Hono",
		siteData: {
			title: "Hello World",
			description: "This is a sample page.",
			image: "https://example.com/image.png",
		} as SiteData,
	};
	return c.html(<Content {...props} />);
});

app.post("/clicked", (c) => {
	return c.html(<h1>Clicked!</h1>);
});

app.get("/todos", (c) => {
	return c.text(<TodoList todos={db} />);
});

app.post("/todos/:id", (c) => {
	const id = c.req.param("id");
	const todo = db.find((t) => t.id === Number(id));
	if (!todo) {
		return c.text("Not found", 404);
	}

	if (todo) {
		todo.completed = !todo.completed;
	}
	return c.html(<TodoItem {...todo} />);
});

app.delete("/todos/:id", (c) => {
	const id = c.req.param("id");
	const todo = db.find((t) => t.id === Number(id));
	if (!todo) {
		return c.text("Not found", 404);
	}

	if (todo) {
		db.splice(db.indexOf(todo), 1);
	}

	return c.text("");
});

export default app;
