export const dynamic = 'force-dynamic';

export function GET(): Response {
  return new Response('OK', {
    status: 200,
    headers: {
      'content-type': 'text/plain',
      'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
      pragma: 'no-cache',
      expires: '0',
    },
  });
}
