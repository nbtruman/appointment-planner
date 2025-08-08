export default function test({ params }: { params: { day: string } }) {

  return (
    <div>
      <h1>Test Page: {params.day}</h1>
      <p>This is a test page for the application.</p>
    </div>
  );
}