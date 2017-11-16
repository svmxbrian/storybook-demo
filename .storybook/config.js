import { configure, setAddon } from '@storybook/react';
import infoAddon from '@storybook/addon-info';

const req = require.context('../src/components', true, /\.stories\.js$/);

setAddon(infoAddon);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
