import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { saveBlob } from '@/advice/saveFile';

const ua = (v: string) =>
  Object.defineProperty(navigator, 'userAgent', { value: v, configurable: true });
const PHONE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1';
const DESKTOP = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/131.0 Safari/537.36';

describe('saveBlob', () => {
  let clicked: HTMLAnchorElement | null;
  beforeEach(() => {
    clicked = null;
    vi.useFakeTimers();
    URL.createObjectURL = vi.fn(() => 'blob:test');
    URL.revokeObjectURL = vi.fn();
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (this: HTMLAnchorElement) {
      clicked = this;
    });
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    // @ts-expect-error test cleanup
    delete navigator.canShare;
    // @ts-expect-error test cleanup
    delete navigator.share;
  });

  it('uses the share sheet on a phone, which is the only route to its file system', async () => {
    ua(PHONE);
    const share = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { canShare: () => true, share });
    await saveBlob(new Blob(['x'], { type: 'image/png' }), 'a.png');
    expect(share).toHaveBeenCalled();
    expect(clicked).toBeNull();
  });

  it('does not force a download when the share sheet is dismissed', async () => {
    ua(PHONE);
    const share = vi.fn().mockRejectedValue(
      Object.assign(new DOMException('cancelled', 'AbortError')),
    );
    Object.assign(navigator, { canShare: () => true, share });
    await saveBlob(new Blob(['x']), 'a.png');
    expect(clicked).toBeNull();
  });

  it('falls back to a download when sharing fails for any other reason', async () => {
    ua(PHONE);
    Object.assign(navigator, { canShare: () => true, share: vi.fn().mockRejectedValue(new Error('nope')) });
    await saveBlob(new Blob(['x']), 'a.png');
    expect(clicked).not.toBeNull();
  });

  it('downloads on desktop rather than opening a share sheet', async () => {
    ua(DESKTOP);
    const share = vi.fn();
    Object.assign(navigator, { canShare: () => true, share });
    await saveBlob(new Blob(['x']), 'a.pdf');
    expect(share).not.toHaveBeenCalled();
    expect(clicked!.download).toBe('a.pdf');
  });

  it('puts the anchor in the document, since a detached one is ignored', async () => {
    ua(DESKTOP);
    await saveBlob(new Blob(['x']), 'a.pdf');
    expect(clicked!.isConnected).toBe(false); // removed after clicking
    expect(clicked!.href).toContain('blob:');
  });

  it('keeps the blob URL alive well past the click', async () => {
    ua(DESKTOP);
    await saveBlob(new Blob(['x']), 'a.pdf');
    expect(URL.revokeObjectURL).not.toHaveBeenCalled();
    vi.advanceTimersByTime(60_000);
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:test');
  });
});
