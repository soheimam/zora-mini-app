import { CollageImage } from './CollageImage'
import { ZoraToken } from '@/app/api/zora-tokens/route'

export function Collage({ tokens, displayName, selectedToken, setSelectedToken }: { tokens: ZoraToken[], displayName: string, selectedToken: ZoraToken | null, setSelectedToken: (token: ZoraToken | null) => void }) {
  // Create a safe tokens array with fallbacks for missing items
  const safeTokens = tokens || [];

  // Layout configuration
  const layoutConfig = [
    { rowIndex: 0, colSpan: 3, position: 0 }, // First row, first item
    { rowIndex: 0, colSpan: 3, position: 1 }, // First row, second item
    { rowIndex: 1, colSpan: 2, position: 2 }, // Middle row, first item
    { rowIndex: 1, colSpan: 4, position: 3 }, // Middle row, second item
    { rowIndex: 2, colSpan: 4, position: 4 }, // Bottom row, first item
  ];

  // Helper function to get col span class
  const getColSpanClass = (span: number) => {
    return `col-span-${span}`;
  };

  return (
    <div className="w-full ">
      <div className="relative w-full min-w-[320px] max-w-[480px] md:max-w-2xl mx-auto px-2 py-4">
        {/* Main title overlapping the grid */}
        <h1 className="absolute left-1/2 top-8 -translate-x-1/2 text-4xl md:text-5xl lg:text-6xl font-bold text-blue-500 z-40"
            style={{ fontFamily: 'monospace' }}>
          {displayName || 'soheybuildsbase'}
        </h1>

        {/* Grid layout that maps over tokens */}
        <div className="grid grid-cols-6 gap-2 md:gap-3 mt-20 mb-6">
          {/* Map over layout config and populate with tokens */}
          {layoutConfig.map((config, i) => {
            const token = i < safeTokens.length ? safeTokens[i] : undefined;
            
            return (
              <div key={i} className={`${getColSpanClass(config.colSpan)} aspect-square`}>
                <CollageImage 
                  token={token}
                  src={token?.imageUrl?.medium || '/placeholder.svg'}
                  alt={token?.name || `Token ${i + 1}`}
                  className={`h-full w-full object-cover ${selectedToken?.name === token?.name ? 'border-2 border-blue-500' : ''}`} 
                  priority 
                  onClick={() => token && setSelectedToken(token)}
                />
              </div>
            );
          })}
          
          {/* Static decorative element */}
          <div className="col-span-2 aspect-square">
            <div className="h-full w-full bg-[#dcd3ba]" />
          </div>
        </div>
      </div>
    </div>
  )
}
