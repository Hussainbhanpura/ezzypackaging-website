import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="text-muted-foreground mt-2">The page you are looking for does not exist.</p>
      <Link href="/" className="inline-block mt-6 underline">Go back home</Link>
    </section>
  );
}


