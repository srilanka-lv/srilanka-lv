const YOUTUBE_ID_PATTERN = /^[a-zA-Z0-9_-]{11}$/;

const YOUTUBE_HOSTS = new Set(['youtube.com', 'm.youtube.com', 'youtube-nocookie.com']);

export function getYouTubeVideoId(url: string): string | null {
  if (!url) {
    return null;
  }

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }

  const host = parsed.hostname.replace(/^www\./, '');
  let id: string | null = null;

  if (host === 'youtu.be') {
    id = parsed.pathname.slice(1);
  } else if (YOUTUBE_HOSTS.has(host)) {
    if (parsed.pathname.startsWith('/watch')) {
      id = parsed.searchParams.get('v');
    } else if (parsed.pathname.startsWith('/embed/')) {
      id = parsed.pathname.split('/')[2] ?? null;
    } else if (parsed.pathname.startsWith('/shorts/')) {
      id = parsed.pathname.split('/')[2] ?? null;
    }
  }

  if (id && YOUTUBE_ID_PATTERN.test(id)) {
    return id;
  }

  return null;
}
