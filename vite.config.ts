import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";
import prerender from "vite-plugin-prerender";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    prerender({
      staticDir: 'dist',
      routes: [
        '/',
        '/about',
        '/contact',
        '/blog',
        '/trades-marketing',
        '/salon-marketing',
        '/real-estate-marketing',
        '/coaching-marketing',
        '/services/paid-ads',
        '/services/social-media',
        '/services/content-creation',
        '/services/seo',
        '/services/lead-generation',
        '/services/web-design',
        '/surrey',
        '/burnaby',
        '/langley',
        '/coquitlam',
        '/blog/how-to-get-more-salon-clients',
        '/blog/how-to-market-a-trades-business-online',
        '/blog/real-estate-agent-social-media-tips',
        '/blog/how-much-does-social-media-marketing-cost-canada',
        '/blog/best-ads-platform-for-small-business-canada',
        '/blog/social-media-marketing-cost-canada',
        '/blog/facebook-ads-vs-google-ads',
        '/blog/real-estate-social-media-tips',
        '/blog/email-marketing-vs-social-media',
        '/blog/best-ads-for-trades-businesses-canada'
      ]
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['@radix-ui/react-accordion', '@radix-ui/react-dropdown-menu', '@radix-ui/react-navigation-menu'],
          'vendor-motion': ['framer-motion'],
          'vendor-misc': ['lucide-react', 'react-helmet-async'],
        },
      },
    },
  },
}));
