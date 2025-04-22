import { CollageImage } from './CollageImage'
import { ZoraToken } from '@/app/api/zora-tokens/route'

export function Collage({ tokens, displayName }: { tokens: ZoraToken[], displayName: string }) {
  // Ensure we have at least 5 placeholders for the grid
  const safeTokens = [...tokens]
  while (safeTokens.length < 6) {
    safeTokens.push({} as ZoraToken)
  }

  return (
    <div className="w-full bg-white">
      <div className="relative w-full min-w-[320px] max-w-[480px] md:max-w-2xl mx-auto px-2 py-4">
        {/* Main title overlapping the grid */}
        <h1 className="absolute left-1/2 top-8 -translate-x-1/2 text-4xl md:text-5xl lg:text-6xl font-bold text-black z-40"
            style={{ fontFamily: 'cursive' }}>
          {displayName || 'soheybuildsbase'}
        </h1>
        
        {/* Stylish subtitle */}
        <div className="absolute right-2 md:right-10 top-1/3 z-40">
          <p className="text-xl md:text-2xl font-medium transform rotate-90 origin-center"
             style={{ fontFamily: 'cursive' }}>
            Fluffy cats
          </p>
        </div>

        {/* Grid layout that matches the second image but takes up full width */}
        <div className="grid grid-cols-6 gap-2 md:gap-3 mt-20 mb-6">
          {/* First row */}
          <div className="col-span-3 aspect-square">
            <CollageImage 
              src={safeTokens[0]?.imageUrl?.medium || '/placeholder.svg'}
              alt={safeTokens[0]?.name || 'Token 1'}
              className="h-full w-full object-cover" 
              priority 
            />
          </div>
          <div className="col-span-3 aspect-square">
            <CollageImage 
              src={safeTokens[1]?.imageUrl?.medium || '/placeholder.svg'}
              alt={safeTokens[1]?.name || 'Token 2'}
              className="h-full w-full object-cover" 
            />
          </div>
          
          {/* Middle row */}
          <div className="col-span-2 aspect-square">
            <CollageImage 
              src={safeTokens[2]?.imageUrl?.medium || '/placeholder.svg'}
              alt={safeTokens[2]?.name || 'Token 3'}
              className="h-full w-full object-cover" 
            />
          </div>
          <div className="col-span-4 aspect-square">
            <CollageImage 
              src={safeTokens[3]?.imageUrl?.medium || '/placeholder.svg'}
              alt={safeTokens[3]?.name || 'Token 4'}
              className="h-full w-full object-cover" 
            />
          </div>

          {/* Bottom row */}
          <div className="col-span-4 aspect-square">
            <CollageImage 
              src={safeTokens[4]?.imageUrl?.medium || '/placeholder.svg'}
              alt={safeTokens[4]?.name || 'Token 5'}
              className="h-full w-full object-cover" 
            />
          </div>
          <div className="col-span-2 aspect-square">
            <div className="h-full w-full bg-[#dcd3ba]" />
          </div>
        </div>
      </div>
    </div>
  )
}
