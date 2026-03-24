import { Sparkles } from 'lucide-react';

interface RiziaLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function RiziaLogo({ size = 'md', showText = true }: RiziaLogoProps) {
  const sizes = {
    sm: { icon: 24, text: 'text-lg', container: 'w-8 h-8' },
    md: { icon: 28, text: 'text-2xl', container: 'w-10 h-10' },
    lg: { icon: 36, text: 'text-4xl', container: 'w-14 h-14' }
  };

  const { icon, text, container } = sizes[size];

  return (
    <div className="flex items-center gap-2">
      {/* Logo Icon */}
      <div className={`${container} relative flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 rounded-xl shadow-lg overflow-hidden group`}>
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Icon */}
        <Sparkles className="text-white relative z-10" size={icon} />
        
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
      </div>
      
      {/* Logo Text */}
      {showText && (
        <span className={`${text} bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent tracking-tight`}>
          Rizia
        </span>
      )}
    </div>
  );
}
