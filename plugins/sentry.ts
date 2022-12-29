import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";

export default defineNuxtPlugin((nuxtApp) => {
  const { vueApp } = nuxtApp;

  Sentry.init({
    app: vueApp,
    dsn: "https://d122cb809476435a901648ec8d33ce4b@o4504211640352768.ingest.sentry.io/4504410978516992",
    integrations: [
      new BrowserTracing({
        tracePropagationTargets: [
          "localhost",
          "127.0.0.1",
          "www.hongrunxingcarpet.com/",
          /^\//,
        ],
      }),
    ],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
});
