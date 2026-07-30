import { useEffect, useRef } from 'react';

const JsonLd = ({ data }: { data: object }) => {
  const ref = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
    ref.current = script;

    return () => {
      if (ref.current && ref.current.parentNode) {
        ref.current.parentNode.removeChild(ref.current);
      }
    };
  }, [data]);

  return null;
};

export default JsonLd;
