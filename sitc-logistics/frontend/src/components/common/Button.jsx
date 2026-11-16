import Link from 'next/link';
import './Button.css';

export default function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'ghost'
  size = 'md',        // 'sm' | 'md' | 'lg'
  href,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
  iconLeft,
  iconRight,
  ...props
}) {
  const buttonClass = `sitc-btn sitc-btn--${variant} sitc-btn--${size} ${className}`.trim();

  const content = (
    <>
      {iconLeft && <span className="sitc-btn__icon sitc-btn__icon--left">{iconLeft}</span>}
      <span className="sitc-btn__text">{children}</span>
      {iconRight && <span className="sitc-btn__icon sitc-btn__icon--right">{iconRight}</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={buttonClass} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {content}
    </button>
  );
}

