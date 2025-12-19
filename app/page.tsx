import { Button } from "@/components/ui/button";
import React from "react";

function HomePage() {
  return <div>
    <h1 className="text-3xl text-muted-foreground">Home Page</h1>
    <Button variant="outline" size="lg" className="capitalize m-8">
      Click Me
    </Button>
  </div>;
}

export default HomePage;
