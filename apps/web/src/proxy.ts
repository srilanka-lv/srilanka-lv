import { type NextRequest, NextResponse } from 'next/server';

// Markdown content negotiation for agents: page requests that explicitly
// accept text/markdown are rewritten to the markdown representation under
// /markdown/*. Browsers never send this Accept value, so HTML stays the
// default; the matcher's `has` condition keeps the proxy off the hot path.
export const proxy = (request: NextRequest): NextResponse => {
  const { pathname } = request.nextUrl;
  const target = pathname === '/' ? '/markdown' : `/markdown${pathname}`;

  return NextResponse.rewrite(new URL(target, request.url));
};

export const config = {
  matcher: [
    {
      source: '/((?!api|_next|markdown|well-known|.*\\..*).*)',
      has: [{ type: 'header', key: 'accept', value: '.*text/markdown.*' }],
    },
  ],
};
