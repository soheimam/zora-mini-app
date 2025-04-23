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
          className="object-cover grayscale hover:grayscale-0 transition-all duration-300"
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        />
      </Link>
      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px]"></div>
      {/* Noise texture */}
      <div className="absolute inset-0 pointer-events-none opacity-5 mix-blend-overlay">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
            backgroundSize: "cover",
          }}
        ></div>
      </div>
    </div>
  )
}
