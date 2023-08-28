import mixpanel from 'mixpanel-browser';
import { MIXED_PANEL_TOKEN } from './constants';

mixpanel.init(MIXED_PANEL_TOKEN, {
  persistence: 'localStorage',
  ignore_dnt: true,
  ...(import.meta.env.DEV && { debug: true })
});

let env_check = import.meta.env.DEV; // import.meta.env.MODE === 'production';

let actions = {
  identify: (id) => {
    if (env_check) mixpanel.identify(id);
  },
  alias: (id) => {
    if (env_check) mixpanel.alias(id);
  },
  track: (name, props) => {
    if (env_check) mixpanel.track(name, props);
  },
  people: {
    set: (props) => {
      if (env_check) mixpanel.people.set(props);
    }
  },
  reset: () => {
    if (env_check) mixpanel.reset();
  }
};

export let Mixpanel = actions;
