import Image from "next/image"
import Link from "next/link"
import { cn } from "../../lib/util"
import { ZoraToken } from "@/app/api/zora-tokens/route" 
interface CollageImageProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
  onClick?: () => void
  token?: ZoraToken
}

export function CollageImage({ src, alt, className, priority = false, onClick, token }: CollageImageProps) {

  // Build a query string from the token object
  const queryString = new URLSearchParams()
  if (token) {
    queryString.set('name', token.name)
  }

  console.log(token, 'token')
  
  return (
    <div className={cn("relative w-full h-full", className)}>
      <Link href={`/token/${token?.address}?${queryString.toString()}`} className="block w-full h-full" onClick={onClick} >
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
