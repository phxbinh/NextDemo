import { getPublicImageUrl } from '../lib/supabase/publicUrl';


export function TodoImage({
  path,
  className = '',
  alt=''
}: {
  path: string;
  alt: string;
  className?: string;
}) {
  const url = getPublicImageUrl(path);
  return (
    <img
      src={url}
      alt={alt}
      className={`max-w-full ${className}`}
      loading="lazy"
      decoding="async"
    />
  );
}