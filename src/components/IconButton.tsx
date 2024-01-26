import { MouseEventHandler, ReactElement } from 'react';

interface IconButtonProps {
  icon: ReactElement;
  title?: string;
  width?: number | 'auto';
  height?: number | 'auto';
  size?: number | 'auto'; // width & height set in one (overridden by width & height respectively)
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

function IconButton({
  icon,
  title,
  onClick,
  width,
  height,
  size,
}: IconButtonProps): ReactElement {
  return (
    <button
      className="icon-button nodrag"
      style={{
        width: width ?? size ?? '100%',
        height: height ?? size ?? 'auto',
      }}
      onClick={onClick}
      title={title}
    >
      {icon}
    </button>
  );
}

export default IconButton;
