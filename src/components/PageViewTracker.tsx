import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { track } from '@/lib/pixel';
import { recordTouch } from '@/lib/attribution';

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
 *
 * It also records where the visitor came from. This has to happen here rather
 * than in the ADvice form: UTMs are on the landing URL and are gone by the
 * time anyone reaches /advice/report to save their email.
 */
const PageViewTracker = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    track('PageView');
    recordTouch(pathname, search);
  }, [pathname, search]);

  return null;
};

export default PageViewTracker;
