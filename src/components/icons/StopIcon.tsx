import { JSX } from 'solid-js/jsx-runtime';
const defaultButtonColor = '#3B81F6';
export const StopIcon = (props: JSX.SvgSVGAttributes<SVGSVGElement> & { isCurrentColor?: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={props.isCurrentColor ? 'currentColor' : (props.color ?? defaultButtonColor)}
    stroke="none"
    {...props}
  >
    <rect x="6" y="6" width="12" height="12" rx="2" />
  </svg>
);
