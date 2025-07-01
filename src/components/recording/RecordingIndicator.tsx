import { SoundWaveAnimation } from './SoundWaveAnimation';
import { CircleDotIcon } from '../icons';

export type RecordingIndicatorProps = {
  elapsedTime: string;
  isLoading?: boolean;
  loadingText?: string;
  waveColor?: string;
  class?: string;
};

export const RecordingIndicator = (props: RecordingIndicatorProps) => {
  const loadingText = () => props.loadingText || 'Sending...';

  return (
    <div class={`flex items-center gap-3 px-4 py-2 ${props.class || ''}`}>
      <span>
        <CircleDotIcon color="red" />
      </span>
      <span>{props.elapsedTime || '00:00'}</span>
      {props.isLoading ? <span class="ml-1.5">{loadingText()}</span> : <SoundWaveAnimation color={props.waveColor} class="ml-3" />}
    </div>
  );
};
