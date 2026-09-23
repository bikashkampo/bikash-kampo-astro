/**
 * Initialize Plyr for video embeds.
 *
 * Videos get data-plyr from the remark-video plugin; the assets are injected
 * by BlogPost.astro only on pages that contain one. The `controls` attribute
 * stays in the markup so videos keep a native player without JavaScript.
 */
document.addEventListener('DOMContentLoaded', () => {
  const videos = document.querySelectorAll('video[data-plyr]');
  if (!videos.length || typeof Plyr === 'undefined') {
    return;
  }

  videos.forEach((video) => {
    new Plyr(video, {
      // Keep the plugin's promise: nothing is fetched until play.
      preload: 'none',
      // Self-hosted icon sprite; the Plyr default points at their CDN.
      iconUrl: '/js/plyr.svg',
      controls: [
        'play-large',
        'play',
        'progress',
        'current-time',
        'duration',
        'mute',
        'volume',
        'settings',
        'airplay',
        'fullscreen',
      ],
      settings: ['speed'],
      tooltips: { controls: true, seek: true },
    });
  });
});
