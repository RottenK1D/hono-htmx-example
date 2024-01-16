import { Hono } from "hono";
import { html } from "hono/html";
import { cors } from "hono/cors";
import { FC } from "hono/jsx";

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

const Content = (props: { siteData: SiteData; name: string }) => (
	<Layout {...props.siteData}>
		<div class="flex flex-col items-center justify-center h-creeen">
			<h1 class="text-center text-2xl">Hello, {props.name}!</h1>
			<button
				hx-post="/clicked"
				hx-swap="outerHTML"
				type="button"
				class="font-bold p-4 border-2 border-gray-300"
			>
				Click me
			</button>
		</div>
	</Layout>
);

// app.use("*", cors());
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

export default app;
