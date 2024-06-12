import Link from 'next/link'

export default function Home() {
  return (
    <main className="max-height flex-col text-center">
      <p className={`basis-2/5 text-l font-semibold`}>stop asking the question,</p>
      <h1 className={`basis-1/5 mb-3 text-4xl font-semibold`}>when?</h1>
      <Link href="/plan">
        <button type="button" class="basis-2/5 flex-none text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg 
        text-l px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700">
          start planning when
        </button>
      </Link>
    </main>
  );
}