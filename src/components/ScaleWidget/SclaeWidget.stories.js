import { storiesOf } from '@storybook/vue';
import { withKnobs, number } from '@storybook/addon-knobs';

import ScaleWidget from './';

storiesOf('components/ScaleWidget', module)
  .addDecorator(withKnobs)
  .add('basic', () => {
    const scale = number('scale', 1.0, { range: true, min: 0.1, max: 2.0, step: 0.1 });

    return {
      props: {
        scale: {
          type: Number,
          default: scale,
        },
      },
      components: { ScaleWidget },
      template: `<div><ScaleWidget v-bind="$props" /></div>`,
    };
  });
