import Editor from '@/components/Editor'

const page = () => {
  return (
    <section className='px-70'>
      <section className='bg-(--paper-100) min-h-screen p-12'>
        <h3 className='text-6xl font-medium font-display'>
          Wathever this is only for tests
        </h3>
        <p className='text-2xl font-display text-(--text-muted-color) mt-1'>
          What waking before dawn taught me about attention.
        </p>
        <section className='mt-20'>
          <Editor />
        </section>
      </section>
    </section>
  )
}

export default page