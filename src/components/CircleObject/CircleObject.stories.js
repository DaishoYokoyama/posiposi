import { storiesOf } from '@storybook/vue';
import { withKnobs, number, color } from '@storybook/addon-knobs';

import CircleObject from './';

storiesOf('components/CiecleObject', module)
  .addDecorator(withKnobs)
  .add('basic', () => {
    const size = number('size', 10);
    const x = number('x', 10);
    const y = number('y', 10);
    const col = color('color', '#ff0000');

    return {
      props: {
        size: { type: Number, default: size },
        x: { type: Number, default: x },
        y: { type: Number, default: y },
        color: { type: String, default: col },
      },
      components: { CircleObject },
      template: '<div style="position:relative"><CircleObject v-bind="$props" /></div>',
    };
  });
