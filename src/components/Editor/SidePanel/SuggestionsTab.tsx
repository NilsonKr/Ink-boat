import { EDITOR_COPY } from '@/lib/copy'

const SuggestionsTab: React.FC = () => {
  const { panel } = EDITOR_COPY

  return (
    <div className='flex-1 overflow-auto px-[26px] pt-[26px] pb-8'>
      <p className='font-display text-[14px] italic text-(--text-label-color)'>
        {panel.suggestionsStub}
      </p>
    </div>
  )
}

export default SuggestionsTab
