import { For } from 'solid-js';

export type SoundWaveAnimationProps = {
  color?: string;
  barCount?: number;
  class?: string;
};

export const SoundWaveAnimation = (props: SoundWaveAnimationProps) => {
  const color = () => props.color || 'bg-blue-500';
  const barCount = () => props.barCount || 7;

  // Generate bars with varying heights and delays
  const bars = () => {
    const heights = [8, 16, 12, 20, 14, 10, 18]; // Predefined heights for natural wave
    const result = [];

    for (let i = 0; i < barCount(); i++) {
      const height = heights[i % heights.length];
      const delay = i * 200; // 200ms stagger between bars

      result.push({
        height,
        delay,
        key: i,
      });
    }

    return result;
  };

  return (
    <div class={`flex items-center gap-1 ${props.class || ''}`}>
      <For each={bars()}>
        {(bar) => (
          <div
            class={`w-1 ${color()} rounded-full animate-pulse`}
            style={{
              height: `${bar.height}px`,
              'animation-delay': `${bar.delay}ms`,
              'animation-duration': '1000ms',
            }}
          />
        )}
      </For>
    </div>
  );
};
