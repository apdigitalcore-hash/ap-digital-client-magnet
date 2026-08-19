import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { track } from '@/lib/pixel';

/**
 * Fires a Meta PageView on every route change.
 *
 * The pixel snippet only fires once per hard load, so in a SPA every
 * client-side navigation was previously invisible. index.html deliberately
 * does not fire PageView itself — this owns it end to end, including the
 * first render, so there is no double count.
 *
 * Keyed on search as well as pathname: /free-pilot?for=roofing and
 * /free-pilot?for=hvac are different campaign landings and should register
 * separately.
 */
const PageViewTracker = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    track('PageView');
  }, [pathname, search]);

  return null;
};

export default PageViewTracker;
