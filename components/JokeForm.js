export default function JokeForm({ onSubmit, initialValue = "" }) {
  return (
    <form onSubmit={onSubmit}>
      <label>
        Joke:
        <input type="text" name="joke" defaultValue={initialValue} />
        <button type="submit">submit</button>
      </label>
    </form>
  );
}
