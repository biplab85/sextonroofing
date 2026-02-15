import Link from 'next/link';

export default function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) {
  const classes = `btn btn--${variant} btn--${size} ${className}`.trim();

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:');

    if (isExternal) {
      return (
        <a href={href} className={classes} {...props}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
