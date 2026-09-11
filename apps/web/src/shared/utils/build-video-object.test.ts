import { describe, expect, it } from 'bun:test';

import { buildVideoObject } from './build-video-object';

const input = {
  url: 'https://www.youtube.com/watch?v=GBPgl2bSy94',
  name: 'Video par ceļojumu',
  description: 'Laura stāsta par ceļojumu.',
  uploadDate: '2026-09-15',
};

describe('buildVideoObject', () => {
  it('builds a schema.org VideoObject from a YouTube watch URL', () => {
    expect(buildVideoObject(input)).toEqual({
      '@type': 'VideoObject',
      name: 'Video par ceļojumu',
      description: 'Laura stāsta par ceļojumu.',
      uploadDate: '2026-09-15',
      thumbnailUrl: 'https://i.ytimg.com/vi/GBPgl2bSy94/hqdefault.jpg',
      contentUrl: 'https://www.youtube.com/watch?v=GBPgl2bSy94',
      embedUrl: 'https://www.youtube.com/embed/GBPgl2bSy94',
    });
  });

  it('returns null without an upload date, which Google requires', () => {
    expect(buildVideoObject({ ...input, uploadDate: undefined })).toBeNull();
  });

  it('returns null when the URL is not a YouTube video', () => {
    expect(buildVideoObject({ ...input, url: 'https://example.com/clip' })).toBeNull();
  });
});
