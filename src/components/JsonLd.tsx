import { useEffect, useRef } from 'react';

/** Collect every @id already declared by JSON-LD the server sent down. */
const prerenderedIds = (skip: HTMLScriptElement | null): Set<string> => {
  const ids = new Set<string>();
  document.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]').forEach((el) => {
    if (el === skip) return;
    let parsed: unknown;
    try {
      parsed = JSON.parse(el.textContent || '');
    } catch {
      return;
    }
    const nodes =
      parsed && typeof parsed === 'object' && '@graph' in (parsed as Record<string, unknown>)
        ? ((parsed as Record<string, unknown>)['@graph'] as unknown[])
        : [parsed];
    (nodes || []).forEach((node) => {
      const id = (node as Record<string, unknown> | null)?.['@id'];
      if (typeof id === 'string') ids.add(id);
    });
  });
  return ids;
};

/**
 * Drop nodes the prerendered HTML already declared.
 *
 * scripts/inject-meta.js writes the organisation node into the static HTML and
 * these components re-emitted the same @id once React mounted. Google merges
 * nodes by @id, saw the aggregateRating twice on one entity, and failed 33
 * items with "Review has multiple aggregate ratings". The prerendered copy is
 * the one crawlers get without running JS, so it wins and we skip the repeat.
 */
const dedupe = (data: object, taken: Set<string>): object | null => {
  const record = data as Record<string, unknown>;
  const graph = record['@graph'];

  if (Array.isArray(graph)) {
    const kept = graph.filter((node) => {
      const id = (node as Record<string, unknown> | null)?.['@id'];
      return !(typeof id === 'string' && taken.has(id));
    });
    if (kept.length === 0) return null;
    if (kept.length === graph.length) return data;
    return { ...record, '@graph': kept };
  }

  const id = record['@id'];
  if (typeof id === 'string' && taken.has(id)) return null;
  return data;
};

const JsonLd = ({ data }: { data: object }) => {
  const ref = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    const payload = dedupe(data, prerenderedIds(ref.current));
    if (!payload) return;

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(payload);
    document.head.appendChild(script);
    ref.current = script;

    return () => {
      if (ref.current && ref.current.parentNode) {
        ref.current.parentNode.removeChild(ref.current);
      }
      ref.current = null;
    };
  }, [data]);

  return null;
};

export default JsonLd;
