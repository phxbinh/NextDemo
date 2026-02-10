import { getPublicImageUrl } from '../lib/supabase/publicUrl';

/*
export function TodoImage({ path }: { path: string }) {
  const url = getPublicImageUrl(path);

  return (
    <img
      src={url}
      alt=""
      className="rounded-lg object-cover w-full h-40"
      loading="lazy"
    />
  );
}
*/


export function TodoImage({
  path,
  className = '',
}: {
  path: string;
  className?: string;
}) {
  return (
    <img
      src={path}
      alt=""
      className={className}
      loading="lazy"
    />
  );
}