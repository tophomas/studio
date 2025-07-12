import React from 'react';

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} PoéticaMente. All rights reserved.</p>
      </div>
    </footer>
  );
}
