export default function Something({params}) {
    // console.log(params);
  return (
    <main>
      <h1>Something</h1>
      <h1>{params.slug}</h1>
    </main>
  );
}
