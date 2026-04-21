import { Link } from "react-router-dom";
import Header from "@/components/Header";
import FooterSection from "@/components/FooterSection";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="pt-16 flex-1 flex items-center justify-center">
        <div className="container mx-auto container-padding text-center">
          <div className="max-w-md mx-auto space-y-4">
            <h1 className="font-serif text-5xl font-semibold text-foreground">404</h1>
            <p className="text-sm text-foreground/60">This page doesn't exist.</p>
            <Link
              to="/"
              className="inline-block mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-all font-medium text-sm"
            >
              Back to start
            </Link>
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default NotFound;
