type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  size: 'small' | 'medium' | 'large';
  variant: 'primary' | 'secondary' | 'tertiary';
};

export default function Button({ children, onClick, disabled, size, variant }: ButtonProps) {
  const buttonStyle = BUTTON_STYLES[`${variant}-${size}`];
  const buttonSize = BUTTON_SIZES[size];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`font-pretendard font-semibold letter-spacing-[-0.03em] ${buttonStyle} ${buttonSize} disabled:${DISABLED_BUTTON_STYLES}`}
    >
      {children}
    </button>
  );
}

// TODO: 버튼 디자인시스템 확정 후 primary 제외 버튼 스타일들 추가
const BUTTON_STYLES = {
  'primary-large': 'bg-primary-300 rounded-[10px] text-[#000000] hover:text-neutral-100 active:bg-primary-400',
  'primary-medium': 'bg-primary-300 rounded-[10px] text-neutral-100 active:bg-primary-400',
  'primary-small': 'bg-primary-300 rounded-[10px] text-neutral-100 active:bg-primary-400',
  'secondary-large': '',
  'secondary-medium': '',
  'secondary-small': '',
  'tertiary-large': '',
  'tertiary-medium': '',
  'tertiary-small': '',
} as const;

const DISABLED_BUTTON_STYLES = 'bg-neutral-300 rounded-[10px] text-neutral-600' as const;

const BUTTON_SIZES = {
  large: 'w-[220px] h-[56px] text-[20px]',
  medium: 'w-[112px] h-[39px] text-[14px]',
  small: 'w-[86px] h-[34px] text-[12px]',
} as const;
