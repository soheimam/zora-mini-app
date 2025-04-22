import Image from "next/image"
import Link from "next/link"
import { cn } from "../../lib/util"

interface CollageImageProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
}

export function CollageImage({ src, alt, className, priority = false }: CollageImageProps) {
  console.log(src, 'src')
  return (
    <div className={cn("relative w-full h-full", className)}>
      <Link href={`/token/${src}/`} className="block w-full h-full">
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          fill
          className="object-cover"
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        />
      </Link>
    </div>
  )
}
