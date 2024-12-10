import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-6 text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to JSON Generator</h1>
      <p className="text-lg mb-4">
        Generate and validate your JSON with ease!
      </p>
      <Link href="/generator">
        <a className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600">
          Go to JSON Generator
        </a>
      </Link>
    </div>
  );
}
