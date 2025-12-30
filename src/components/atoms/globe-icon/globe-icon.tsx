import styles from './globe-icon.module.css';

interface GlobeIconProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const GlobeIcon = ({ className = '', size = 'md' }: GlobeIconProps) => {
  const sizeClass = styles[size];

  return (
    <svg
      className={`${styles.icon} ${sizeClass} ${className}`}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle cx='12' cy='12' r='10' />
      <ellipse cx='12' cy='12' rx='10' ry='4' />
      <path d='M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z' />
    </svg>
  );
};
