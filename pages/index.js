import useSWR from "swr";
import Link from "next/link";
import JokeForm from "@/components/JokeForm";

export default function HomePage() {
  const { data, isLoading, mutate } = useSWR("/api/jokes");

  async function handleSubmit(event) {
    event.preventDefault();

    // collect data from form
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    console.log(data);

    // send data "over the wire"
    const response = await fetch("/api/jokes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      mutate(); // reloads the data for "/api/jokes"
      event.target.reset();
    }
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }

  return (
    <>
      <JokeForm onSubmit={handleSubmit} />
      <ul>
        {data.map((joke) => (
          <li key={joke._id}>
            <Link href={`/${joke._id}`}>{joke.joke}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

// 1. Create Form to enter joke string. ✅
// 2. Submithandler for collecting data from form (FormData) ✅
// 3. Send the data "over the wire" to the backend with a POST request ✅
// 4. Use Joke.create() for adding a document to the mongoDB collection. ✅
// 5. Return a success response and refetch all jokes in the frontend. ✅
