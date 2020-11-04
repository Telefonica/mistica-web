FROM zenika/alpine-chrome:87

ENV TZ UTC
ENV LANG es_ES

ENTRYPOINT ["chromium-browser"]

CMD [ \
  # flags from https://github.com/GoogleChrome/puppeteer/blob/master/lib/Launcher.js
  "--disable-background-networking", \
  "--disable-background-timer-throttling", \
  "--disable-breakpad", \
  "--disable-client-side-phishing-detection", \
  "--disable-default-apps", \
  "--disable-dev-shm-usage", \
  "--disable-extensions", \
  "--disable-features=site-per-process", \
  "--disable-hang-monitor", \
  "--disable-popup-blocking", \
  "--disable-prompt-on-repost", \
  "--disable-sync", \
  "--disable-translate", \
  "--metrics-recording-only", \
  "--no-first-run", \
  "--safebrowsing-disable-auto-update", \
  "--enable-automation", \
  "--password-store=basic", \
  "--use-mock-keychain", \
  "--headless", \
  "--disable-dev-shm-usage", \
  # Disable sandbox mode
  "--no-sandbox", \
  # Avoids font rendering differences between headless/headfull
  "--font-render-hinting=none", \
  # Expose port 9222 for remote debugging
  "--remote-debugging-port=9222", \
  "--remote-debugging-address=0.0.0.0" \
  ]
