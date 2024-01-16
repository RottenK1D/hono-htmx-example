import { Hono } from "hono";
import { html } from "hono/html";
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
</head>
<body>
  ${props.children}
</body>
</html>
`;

const Content = (props: { siteData: SiteData; name: string }) => (
	<Layout {...props.siteData}>
		<h1>Hello, {props.name}!</h1>
	</Layout>
);

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

export default app;
