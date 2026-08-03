import type { Preview } from '@storybook/nextjs';

// Panda 전역 스타일(토큰·globalCss)을 로드한다. postcss panda 플러그인이 이 지점에 스타일을 주입한다.
import '../app/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
