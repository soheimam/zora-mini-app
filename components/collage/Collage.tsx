import { CollageImage } from './CollageImage'

export function Collage({ tokens, displayName }: { tokens: ZoraToken[], displayName: string }) {
    console.log(JSON.stringify(tokens, null, 2))
  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-4 md:p-6">
      <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-2 md:gap-3 lg:gap-4 relative">

        {/* Dynamic name heading */}
        <div className="col-span-2 md:col-span-3 md:col-start-6 row-start-1 z-30 flex justify-center items-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black" style={{ fontFamily: 'cursive' }}>
            {displayName || 'Summer'}
          </h1>
        </div>

        {/* Token 1 — large image */}
        <div className="col-span-2 md:col-span-4 row-span-3 z-10 md:col-start-1 md:row-start-1">
          <CollageImage 
            src={tokens[0]?.imageUrl.medium || '/placeholder.svg'}
            alt={tokens[0]?.name || 'Token 1'}
            className="min-h-[200px] md:min-h-[300px]" 
            priority 
          />
        </div>

        {/* Token 2 */}
        <div className="col-span-2 md:col-span-4 row-span-3 z-20 md:col-start-5 md:row-start-2">
          <CollageImage 
            src={tokens[1]?.imageUrl.medium || '/placeholder.svg'}
            alt={tokens[1]?.name || 'Token 2'}
            className="min-h-[180px] md:min-h-[260px]" 
          />
        </div>

        {/* Personalized token title */}
        <div className="col-span-2 row-span-1 z-30 flex items-center md:col-start-9 md:row-start-3">
          <p
            className="text-lg md:text-xl font-bold transform md:-rotate-90 md:origin-center"
            style={{ fontFamily: 'cursive' }}
          >
            {tokens[0]?.name || 'August with love'}
          </p>
        </div>

        {/* Token 3 */}
        <div className="col-span-2 md:col-span-4 row-span-3 z-20 md:col-start-1 md:row-start-4">
          <CollageImage 
            src={tokens[2]?.imageUrl.medium || '/placeholder.svg'}
            alt={tokens[2]?.name || 'Token 3'}
            className="min-h-[180px] md:min-h-[250px]" 
          />
        </div>

        {/* Token 4 */}
        <div className="col-span-2 md:col-span-3 row-span-3 z-10 md:col-start-5 md:row-start-5">
          <CollageImage 
            src={tokens[3]?.imageUrl.medium || '/placeholder.svg'}
            alt={tokens[3]?.name || 'Token 4'}
            className="min-h-[180px] md:min-h-[220px]" 
          />
        </div>

        {/* Token 5 */}
        <div className="col-span-2 md:col-span-4 row-span-3 z-10 md:col-start-8 md:row-start-4">
          <CollageImage 
            src={tokens[4]?.imageUrl.medium || '/placeholder.svg'}
            alt={tokens[4]?.name || 'Token 5'}
            className="min-h-[180px] md:min-h-[250px]" 
          />
        </div>

        {/* Art + style blocks */}
        <div className="col-span-1 row-span-1 z-5 md:col-start-4 md:row-start-7">
          <div className="w-full h-full aspect-square bg-black opacity-70 rounded-full blur-sm" />
        </div>
        <div className="col-span-1 row-span-1 z-5 md:col-start-9 md:row-start-2">
          <div className="w-full h-full aspect-square bg-black opacity-50 rounded-full blur-sm" />
        </div>
        <div className="col-span-1 row-span-2 bg-[#f5e8d6] md:col-start-2 md:row-start-7" />
        <div className="col-span-1 row-span-2 bg-[#f5e8d6] md:col-start-10 md:row-start-6" />
      </div>
    </div>
  )
}
