import { html } from "hono/html";
import { jsxRenderer } from "hono/jsx-renderer";

export interface Todo {
	id: number;
	title: string;
}

export const renderer = jsxRenderer(({ children }) => {
	return html`
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://unpkg.com/htmx.org@1.9.10"></script>
        <script src="https://cdn.tailwindcss.com"></script>
        <title>Hono + htmx</title>
      </head>
      <body>
        <div class="p-4">
          <h1 class="text-4xl font-bold mb-4"><a href="/">Todo</a></h1>
          ${children}
        </div>
      </body>
    </html>
    `;
});

export const AddTodo = () => (
	<form hx-post="/todo" hx-target="#todo" hx-swap="beforebegin" class="mb-4">
		<div class="mb-2">
			<input
				type="text"
				name="title"
				class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5"
			/>
		</div>
		<button
			class="text-white bg-blue-300 hover:bg-blue-400 rounded-lg px-5 py-2 text-center"
			type="submit"
		>
			submit
		</button>
	</form>
);

export const Item = ({ title, id }: Todo) => (
	<p
		hx-delete={`/todo/${id}`}
		hx-swap="outerHTML"
		class="flex row items-center justify-between py-1 px-4 rounded-lg text-lg border bg-gray-100 text-gray-600 mb-2"
	>
		{title}
		<button class="font-medium" type="button">
			delete
		</button>
	</p>
);
