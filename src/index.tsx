import { Hono } from "hono";
import { FC } from "hono/jsx";

const app = new Hono();

interface Props {
	name: string;
	age: number;
}



const Home: FC<Props> = (props: Props) => {
	return (
		<div>
			<h1>Hello Hono!</h1>
			<div>{props.name}</div>
			<div>{props.age}</div>
		</div>
	);
};

app.get("/", (c) => {
	return c.html(<Home name={"Rinards"} age={22} />);
});

export default app;
