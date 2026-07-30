'use client'
import { useState, useTransition } from 'react'

import { saveProviderKeyAction } from '@/actions/providerKeys'

import { EDITOR_COPY } from '@/lib/constants/editor'
import { AI_PROVIDERS, PROVIDER_KEY_COPY, PROVIDER_OPTIONS } from '@/lib/constants/providers'

import type { AIProvider, ProviderKeySummary } from '@/types/providers'

type ComponentProps = {
  initialProvider?: AIProvider
  initialLabel?: string
  onConnected: (key: ProviderKeySummary) => void
  onCancel?: () => void
}

const labelStyles = 'font-mono text-[9.5px] uppercase tracking-[0.14em] text-(--text-label-color)'

// Underline fields: no box, a 1.5px rule that turns marigold on focus.
const fieldStyles = `
  w-full border-0 border-b-[1.5px] bg-transparent px-0.5 pt-1.5 pb-[9px]
  text-(--text-strong) outline-none transition-colors
  focus:border-(--marigold-500)
`

const hintStyles = 'font-display text-[12.5px] text-(--text-muted-color)'

const actionStyles = 'font-mono text-[9px] uppercase tracking-[0.1em] text-(--plum-500) cursor-pointer'

const ProviderSetup: React.FC<ComponentProps> = ({
  initialProvider = PROVIDER_OPTIONS[0],
  initialLabel = '',
  onConnected,
  onCancel,
}) => {
  const { providerSetup } = EDITOR_COPY

  const [provider, setProvider] = useState<AIProvider>(initialProvider)
  const [keyName, setKeyName] = useState<string>(initialLabel)
  const [apiKey, setApiKey] = useState<string>('')
  const [isRevealed, setIsRevealed] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const [isPending, startTransition] = useTransition()

  const meta = AI_PROVIDERS[provider]
  const canConnect = !!keyName.trim() && !!apiKey.trim() && !isPending

  const handleConnect = () => {
    if (!canConnect) return

    setError(null)

    startTransition(async () => {
      const result = await saveProviderKeyAction({ provider, label: keyName.trim(), apiKey: apiKey.trim() })

      if (result.status === 'saved') {
        // The typed key leaves the client the moment the server confirms it.
        setApiKey('')
        onConnected(result.key)
        return
      }

      if (result.status === 'invalid_input') setError(result.message)
      else setError(PROVIDER_KEY_COPY[result.status === 'invalid_key' ? 'invalidKey' : 'unreachable'])
    })
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') handleConnect()
  }

  return (
    <div className='flex flex-1 flex-col overflow-auto'>
      <div className='provider-aurora relative flex-none overflow-hidden bg-[linear-gradient(110deg,var(--plum-500)_0%,var(--plum-300)_28%,var(--marigold-500)_50%,var(--plum-300)_72%,var(--plum-500)_100%)] px-7 pt-[26px] pb-6'>
        <div className='provider-orb absolute -top-11 -right-[30px] size-[150px] rounded-full bg-white/[0.18] blur-[4px]' />

        <div className='relative mb-5 flex items-center justify-between'>
          <span className='font-mono text-[9.5px] uppercase tracking-[0.18em] text-white/85'>
            {providerSetup.eyebrow}
          </span>
        </div>

        <div className='relative'>
          <div className='mb-0.5 font-display text-[28px] text-white'>{providerSetup.mark}</div>
          <h2 className='font-display text-[27px] font-medium leading-none tracking-[-0.02em] text-white'>
            {providerSetup.heading}
          </h2>
          <p className='mt-2 font-display text-[14.5px] italic leading-[1.4] text-white/[0.88]'>
            {providerSetup.intro}
          </p>
        </div>
      </div>

      <div className='relative flex flex-col gap-[22px] px-7 pt-7 pb-[30px]'>
        <span
          aria-hidden
          className='pointer-events-none absolute -top-[30px] -right-2 font-display text-[170px] leading-none text-[color-mix(in_srgb,var(--plum-500)_7%,transparent)]'
        >
          {providerSetup.mark}
        </span>

        <div className='relative flex flex-col gap-[7px]'>
          <label htmlFor='ai-provider' className={labelStyles}>
            {providerSetup.providerLabel}
          </label>
          <div className='relative'>
            <select
              id='ai-provider'
              value={provider}
              onChange={({ target }) => setProvider(target.value as AIProvider)}
              className={`${fieldStyles} cursor-pointer appearance-none rounded-none border-(--espresso-800) pr-[26px] font-display text-[19px]`}
            >
              {PROVIDER_OPTIONS.map(option => (
                <option key={option} value={option}>
                  {AI_PROVIDERS[option].label}
                </option>
              ))}
            </select>
            <span className='pointer-events-none absolute top-1/2 right-0.5 -translate-y-1/2 font-mono text-[12px] text-(--text-muted-color)'>
              ▾
            </span>
          </div>
          <span className='font-mono text-[9px] uppercase tracking-[0.08em] text-(--text-label-color)'>
            {providerSetup.providerHint}
          </span>
        </div>

        <div className='relative flex flex-col gap-[7px]'>
          <label htmlFor='key-name' className={labelStyles}>
            {providerSetup.keyNameLabel}
          </label>
          <input
            id='key-name'
            type='text'
            value={keyName}
            placeholder={meta.keyNameExample}
            onChange={({ target }) => setKeyName(target.value)}
            onKeyDown={handleKeyDown}
            className={`${fieldStyles} border-(--line-strong) font-display text-[19px] placeholder:text-(--text-label-color)`}
          />
          <span className={hintStyles}>{providerSetup.keyNameHint}</span>
        </div>

        <div className='relative flex flex-col gap-[7px]'>
          <div className='flex items-baseline justify-between'>
            <label htmlFor='api-key' className={labelStyles}>
              {providerSetup.apiKeyLabel}
            </label>
            <button type='button' onClick={() => setIsRevealed(prev => !prev)} className={actionStyles}>
              {isRevealed ? providerSetup.hide : providerSetup.reveal}
            </button>
          </div>
          <input
            id='api-key'
            type={isRevealed ? 'text' : 'password'}
            value={apiKey}
            placeholder={meta.placeholder}
            autoComplete='off'
            spellCheck={false}
            onChange={({ target }) => setApiKey(target.value)}
            onKeyDown={handleKeyDown}
            className={`${fieldStyles} border-(--line-strong) font-mono text-[16px] placeholder:text-(--text-label-color)`}
          />
          <span className={hintStyles}>
            {providerSetup.keyHint}{' '}
            <a
              href={meta.consoleUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='text-(--plum-500) hover:text-(--plum-700) hover:underline'
            >
              {meta.consoleLabel}
            </a>
            .
          </span>
        </div>

        {error && (
          <p role='alert' className='font-display text-[13px] leading-[1.45] text-(--destructive)'>
            {error}
          </p>
        )}

        <button
          type='button'
          disabled={!canConnect}
          onClick={handleConnect}
          className='
            group mt-1 flex items-center justify-between gap-2.5 rounded-[10px] px-[18px] py-[15px]
            font-sans text-[14.5px] font-semibold transition-colors
            bg-(--espresso-800) text-(--text-on-dark) cursor-pointer
            enabled:hover:bg-(--espresso-900)
            disabled:cursor-not-allowed disabled:bg-(--sand-300) disabled:text-(--text-label-color)
          '
        >
          <span>{isPending ? providerSetup.connecting : providerSetup.connect}</span>
          {/* Marigold reads as light-on-ink, but goes black once the button greys out. */}
          <span className='font-display text-[16px] text-(--marigold-300) group-disabled:text-black'>
            {providerSetup.connectIcon}
          </span>
        </button>

        {onCancel && (
          <button type='button' onClick={onCancel} className={`${actionStyles} self-start`}>
            {providerSetup.cancel}
          </button>
        )}
      </div>
    </div>
  )
}

export default ProviderSetup
