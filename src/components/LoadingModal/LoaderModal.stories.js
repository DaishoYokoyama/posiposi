import { withKnobs, color, number } from '@storybook/addon-knobs';

import LoaderModal from '.';

export default {
  title: 'components/LoaderModal',
  decorators: [withKnobs],
};

export const basic = () => {
  return {
    props: {
      color: {
        type: String,
        default: color('color', '#4c7ee8'),
      },
      width: {
        type: Number,
        default: number('width', 5),
      },
      height: {
        type: Number,
        default: number('height', 25),
      },
    },
    components: { LoaderModal },
    template: '<LoaderModal v-bind="$props" />',
  };
};
