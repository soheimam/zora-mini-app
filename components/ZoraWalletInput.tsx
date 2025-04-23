'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Collage } from '@/components/collage/Collage'
import { validateHandle } from '@/lib/validateWallet'
import { ZoraTokenResponse, ZoraToken } from '@/app/api/zora-tokens/route'

export function ZoraWalletInput() {
  const [handle, setHandle] = useState('')
  const [tokens, setTokens] = useState<ZoraToken[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
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
          <Button variant="outline" onClick={handleReset}>
            Try another handle
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-lg font-bold text-center text-white">
        🎨 Enter your Zora handle to generate your token grid
      </h2>

      <div className="flex">
        <div className="bg-gray-800 p-2 px-3 rounded-l-md text-gray-400">@</div>
        <Input
          placeholder="zorahandle"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          className="text-sm rounded-l-none"
        />
      </div>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <Button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full"
      >
        {loading ? 'Checking Zora Profile...' : 'Generate My Collage'}
      </Button>
    </div>
  )
}
