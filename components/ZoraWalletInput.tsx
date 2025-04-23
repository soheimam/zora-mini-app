'use client'

import { useState } from 'react'
import { Collage } from '@/components/collage/Collage'
import { validateHandle } from '@/lib/validateWallet'
import { ZoraTokenResponse, ZoraToken } from '@/app/api/zora-tokens/route'

export function ZoraWalletInput() {
  const [handle, setHandle] = useState('')
  const [tokens, setTokens] = useState<ZoraToken[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [profileData, setProfileData] = useState<{
    displayName?: string
    profileImage?: string | null
    profileHandle?: string | null
  } | null>(null)

  const [selectedToken, setSelectedToken] = useState<ZoraToken | null>(null)

  const handleSubmit = async () => {
    const trimmedHandle = handle.trim()

    if (!validateHandle(trimmedHandle)) {
      setError('Please enter a valid Zora handle')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`/api/zora-tokens?handle=${encodeURIComponent(trimmedHandle)}`)
      const data = await res.json() as ZoraTokenResponse
      console.log(JSON.stringify(data, null, 2))

      if (res.status !== 200) {
        setError( 'Failed to fetch profile data')
        return
      }

      if (!data.tokens || data.tokens.length === 0) {
        setError('No tokens found for this Zora handle.')
        return
      }

      setTokens(data.tokens)
      setProfileData({
        displayName: data.displayName,
        profileImage: data.profileImage,
        profileHandle: data.profileHandle,
      })
    } catch (err) {
      console.error(err)
      setError('Failed to fetch tokens. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setTokens([])
    setHandle('')
    setError(null)
    setProfileData(null)
  }

  if (tokens.length > 0 && profileData) {
    return (
      <div className="w-full">
        <Collage selectedToken={selectedToken} setSelectedToken={setSelectedToken} tokens={tokens} displayName={profileData.displayName || ''} />
        <div className="flex justify-center mt-4 mb-6">
          <button 
            onClick={handleReset}
            className="border border-gray-700 hover:border-lime-300 text-gray-400 py-3 px-6 font-mono tracking-wider transition-colors duration-300">
            Try another handle
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="w-full max-w-md relative">
        <div className={`border ${isFocused ? 'border-lime-700/70' : 'border-lime-700/40'} bg-black p-8 relative mx-4 transition-colors duration-300`}>
          <h2 className="text-5xl font-bold text-white mb-8 text-center font-mono">
            ENTER YOUR HANDLE
          </h2>

          <div className="space-y-6">
            <div className={`relative bg-[#1a1e2e] overflow-hidden ${isFocused ? 'ring-1 ring-lime-700/30' : ''}`}>
              <div className="flex">
                <div className="bg-[#1a1e2e] py-4 px-4 text-gray-400 font-mono">@</div>
                <input
                  id="zora-handle-input"
                  type="text"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="zorahandle"
                  className="w-full bg-transparent text-gray-300 py-4 pr-6 font-mono tracking-wider focus:outline-none"
                  style={{ borderLeft: '2px solid rgba(163, 230, 53, 0.3)' }}
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm text-center font-mono">{error}</p>}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-black border border-gray-700 hover:border-lime-300 text-gray-500 py-5 font-mono tracking-wider transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-8"
            >
              {loading ? 'CHECKING ZORA PROFILE...' : 'GENERATE MY COLLAGE'}
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500 font-mono">YOUR TOKENS WILL APPEAR IN THE COLLAGE</p>
          </div>

          {/* Corner decorations */}
          <div className="absolute -top-6 -left-6 w-12 h-12">
            <div className="w-full h-full relative">
              <div className="absolute inset-0 border border-lime-700/40 rotate-45"></div>
            </div>
          </div>

          <div className="absolute -bottom-6 -right-6 w-12 h-12">
            <div className="w-full h-full relative">
              <div className="absolute inset-0 border border-lime-700/40 rotate-45"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
