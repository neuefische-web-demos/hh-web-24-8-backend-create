import useSWR from "swr";
import { useRouter } from "next/router";
import Link from "next/link";
import JokeForm from "@/components/JokeForm";

export default function Joke() {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, error, mutate } = useSWR(`/api/jokes/${id}`);

  async function handleEditJoke(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    console.log(data);

    const response = await fetch(`/api/jokes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      mutate();
    }
  }

  async function handleDeleteJoke() {
    const response = await fetch(`/api/jokes/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      router.push("/");
    }
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data || error) {
    return <h1>Element not found.</h1>;
  }

  return (
    <>
      <JokeForm onSubmit={handleEditJoke} initialValue={data.joke} />
      <button onClick={handleDeleteJoke}>delete</button>
      <small>ID: {id}</small>
      <h1>{data.joke} </h1>
      <Link href="/">Back to all</Link>
    </>
  );
}
