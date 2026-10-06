/**
 * Hands a generated file to the visitor, on a phone as well as a desktop.
 *
 * The obvious version — create an anchor, set `download`, click it — quietly
 * fails on phones for two separate reasons:
 *
 *  1. iOS Safari largely ignores the `download` attribute on a blob URL. It
 *     navigates to the blob instead, or does nothing at all.
 *  2. Revoking the object URL on the next line cancels the transfer. A desktop
 *     browser has usually started reading the blob by then; a phone has not.
 *
 * So the share sheet comes first where it exists. It is the only dependable
 * route to a phone's file system, and "Save to Files" or "Save Image" is what
 * someone expects on a phone anyway. The anchor is the desktop path, with the
 * element actually in the document and the URL revoked much later.
 */
export async function saveBlob(blob: Blob, filename: string): Promise<void> {
  const file = new File([blob], filename, { type: blob.type });

  // Desktop Chrome can share too, but there a download is what someone wants
  // and an OS share sheet is a worse answer. Phones only.
  const onPhone = typeof navigator !== 'undefined' && /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (onPhone && navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file] });
      return;
    } catch (e) {
      // Dismissing the sheet is a decision, not a failure — do not then shove
      // a download at them. Anything else falls through to the anchor.
      if (e instanceof DOMException && e.name === 'AbortError') return;
    }
  }

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.rel = 'noopener';
  // Some browsers ignore a click on an element that is not in the document.
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  a.remove();
  // Long enough for a slow connection to have taken the bytes.
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}
