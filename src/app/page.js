'use client'
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const router = useRouter();

  const createMeetupPlan = async () => {
    // Make a request to '/create-plan' endpoint
    const res = await fetch('/create-plan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const planData = await res.json();
    if (planData.success) {
      console.log(planData.id);
      router.push(`/plan/${planData.id}`);
    } else {
      console.log("Could not be created.")
    }
  }

  return (
    <main className="max-height flex-col text-center">
      <p className={`basis-2/5 text-l font-semibold`}>stop asking the question,</p>
      <h1 className={`basis-1/5 mb-3 text-4xl font-semibold`}>when?</h1>
      <button type="button" class="basis-2/5 flex-none text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg 
      text-l px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
      onClick={createMeetupPlan}>
        start planning when
      </button>
    </main>
  );
}