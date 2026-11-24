// Testi presi da Timestral/README.md ("Download and install") e da PIANO_PUBBLICAZIONE.md.
export default {
  name: 'Till Dusk',
  url: 'https://tilldusk.mattbonfanti.com',
  platform: 'macOS menu-bar app · runs offline',
  tagline: 'Will your battery last the day? Know before it matters.',
  description:
    'Till Dusk learns how you use your MacBook battery and forecasts how much charge you will have at the end of the day. If you are not going to make it, it offers to turn on Low Power Mode.',
  requirements: 'macOS 26 or later on an Apple silicon Mac (M1 or later). The download is a few hundred MB: Python, PyTorch and the model are inside, so it works without internet.',
  download: { label: 'Download from GitHub', href: 'https://github.com/mattBonfanti/till-dusk/releases/latest' },
  repo: 'https://github.com/mattBonfanti/till-dusk',
  license: 'Third-party licenses inside the app',
  og: '/og.png',
  screens: [
    { src: '/screens/tilldusk-panel.png', w: 640, h: 1352, alt: 'The Till Dusk panel: estimated battery life until tomorrow at 13:50, a forecast chart with an uncertainty band, a low-margin warning with a Turn On Low Power Mode button, and settings.' },
    { src: '/screens/tilldusk-saving.png', w: 640, h: 624, alt: 'Two Low Power Mode proposals: one when the battery may not last until evening, one when there is little margin for the day.' },
    { wide: true, src: '/screens/tilldusk-menubar.png', w: 2352, h: 352, alt: 'The menu-bar battery in every state, on light and dark bars: full, half, low, charging, Low Power Mode, below threshold.' },
  ],
  install: [
    'Download the TillDusk zip from <a href="https://github.com/mattBonfanti/till-dusk/releases/latest">the latest release</a>, open it and drag <strong>Till Dusk.app</strong> to Applications.',
    'The app is not notarized by Apple, so on first launch macOS says it cannot verify it. Close the alert, open <strong>System Settings → Privacy &amp; Security</strong>, scroll to the message about Till Dusk and click <strong>Open Anyway</strong>.',
    'From then on it opens normally. You can start it at login from its panel.',
  ],
  featuresTitle: 'What it does',
  features: [
    { title: 'Learns your day', text: 'It reads your battery history from macOS and its own log, so the forecast is about how you use your Mac, not an average user.' },
    { title: 'A forecast with honest margins', text: 'A central estimate and a cautious one, as a band. Built on Timestral, Mistral AI’s time-series model, running on your Mac.' },
    { title: 'Steps in only when asked', text: 'When the forecast runs out before evening, it proposes Low Power Mode. macOS asks for your password in its own dialog; the app never sees it.' },
  ],
  sections: [
    {
      title: 'Why a forecasting model',
      intro: 'macOS answers “how long will it last if I keep going like this”. Till Dusk answers a different question: “where will my charge be this evening, given how I usually use this Mac”. For that it uses <a href="https://mistral.ai/news/timestral/">Timestral</a>, Mistral AI’s time-series model.',
      items: [
        { title: 'No training on your data', text: 'Timestral-28M is a pretrained model. It is not fine-tuned on you: each forecast simply reads more of your history, up to about 110 days.' },
        { title: 'A band, not a number', text: 'The model returns a median and 21 quantiles. That is where the central estimate and the cautious one come from, and why the chart shows a band.' },
        { title: 'Runs on your Mac', text: 'Model, Python and PyTorch are inside the app and run on the CPU. Nothing is uploaded; there is no server to call.' },
        { title: 'Tested, with honest limits', text: 'Six hours ahead, starting on battery: 6.8 points of average error against 20.4 for “keep the current pace”, roughly what macOS does. One hour ahead the current pace wins. The test is small: 20 discharge sessions on one Mac.' },
      ],
    },
    {
      title: 'Design choices',
      items: [
        { title: 'Show the uncertainty', text: 'A forecast without its margin invites false confidence. The cautious estimate is always on screen next to the central one.' },
        { title: 'Quiet by default', text: 'It speaks up only when the forecast runs out before evening, and then it proposes Low Power Mode. It does not decide for you.' },
        { title: 'Restraint over spectacle', text: 'One compact chart, no oversized graphs, a menu-bar battery drawn like the one macOS already has.' },
        { title: 'Your password stays with macOS', text: 'Changing Low Power Mode goes through macOS’s own administrator dialog. The app never sees the password.' },
      ],
    },
  ],
  related: { text: 'From the same maker: a notch indicator for your coding agents, designed against The UX DeCode.', label: 'AgentNotch', href: 'https://agentnotch.mattbonfanti.com' },
  caseStudy: null,
  privacy: [
    'Till Dusk has no account, no analytics and no server. The app sends nothing over the network.',
    'Battery history is read from copies of the macOS power log and stays on your Mac. The forecast runs locally with the bundled model.',
    'To turn Low Power Mode on or off, the app asks macOS to show its own administrator dialog. The password goes to macOS, not to the app.',
    'Licenses: Timestral code is Apache 2.0; Mistral AI’s Timestral-28M weights are under a modified MIT license; the menu-bar battery is adapted from BatteryOracle by Michele Ivo Galella (MIT). The texts are inside the app, in Contents/Resources/licenses.',
  ],
};
