import type {NextPage} from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'

const Viewer = dynamic(() => import('../components/viewer'), {ssr: false})

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Three.js Repro</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col h-[100vh]">
        <div className="relative flex w-full h-full">
          <Viewer />
        </div>
      </main>
    </div>
  )
}

export default Home
