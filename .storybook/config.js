import { configure } from '@kadira/storybook';
// import infoAddon from '@kadira/react-storybook-addon-info';

// setAddon(infoAddon);
function loadStories() {
  require('../stories/index.js');
  // You can require as many stories as you need.
}

configure(loadStories, module);