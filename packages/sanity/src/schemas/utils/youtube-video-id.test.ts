import { describe, expect, test } from 'bun:test';

import { getYouTubeVideoId } from './youtube-video-id';

describe('getYouTubeVideoId', () => {
  test('parses youtu.be short links', () => {
    expect(getYouTubeVideoId('https://youtu.be/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
  });

  test('parses watch URLs', () => {
    expect(getYouTubeVideoId('https://www.youtube.com/watch?v=dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
  });

  test('parses embed URLs', () => {
    expect(getYouTubeVideoId('https://www.youtube.com/embed/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
  });

  test('parses shorts URLs', () => {
    expect(getYouTubeVideoId('https://www.youtube.com/shorts/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
  });

  test('keeps the id from watch URLs with extra query params', () => {
    expect(getYouTubeVideoId('https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=42s')).toBe(
      'dQw4w9WgXcQ',
    );
  });

  test('parses youtu.be links with a timestamp', () => {
    expect(getYouTubeVideoId('https://youtu.be/dQw4w9WgXcQ?t=42')).toBe('dQw4w9WgXcQ');
  });

  test('returns null for non-YouTube URLs', () => {
    expect(getYouTubeVideoId('https://vimeo.com/12345678')).toBeNull();
  });

  test('returns null for malformed input', () => {
    expect(getYouTubeVideoId('not a url')).toBeNull();
  });

  test('returns null for empty input', () => {
    expect(getYouTubeVideoId('')).toBeNull();
  });

  test('parses m.youtube.com watch URLs', () => {
    expect(getYouTubeVideoId('https://m.youtube.com/watch?v=dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
  });

  test('parses youtube-nocookie.com watch URLs', () => {
    expect(getYouTubeVideoId('https://www.youtube-nocookie.com/watch?v=dQw4w9WgXcQ')).toBe(
      'dQw4w9WgXcQ',
    );
  });

  test('parses youtube-nocookie.com embed URLs', () => {
    expect(getYouTubeVideoId('https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ')).toBe(
      'dQw4w9WgXcQ',
    );
  });

  test('parses watch URLs with a trailing slash', () => {
    expect(getYouTubeVideoId('https://www.youtube.com/watch/?v=dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
  });
});
