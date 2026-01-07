import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

export default function ServiceNotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 items-center justify-center px-6 pt-20">
        <div className="text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            404
          </p>
          <h1 className="mb-4 font-serif text-4xl font-medium text-foreground">
            Service Not Found
          </h1>
          <p className="mb-8 text-muted-foreground">
            The service you're looking for doesn't exist or has been moved.
          </p>
          <Button asChild className="gap-2 rounded-none">
            <Link href="/services">
              <ArrowLeft className="h-4 w-4" />
              Back to Services
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
