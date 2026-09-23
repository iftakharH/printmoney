import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 py-16 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-mint">Error 404</p>
      <h1 className="mt-3 text-3xl font-bold text-text">This note isn&apos;t in circulation</h1>
      <p className="mt-2 text-sm text-text-muted">
        The page you requested doesn&apos;t exist — maybe it was withdrawn like old series notes.
      </p>
      <Link href="/" className="btn-primary mt-6 rounded-lg px-5 py-2.5 text-sm">
        Return to the lab
      </Link>
    </div>
  );
}
