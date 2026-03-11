import StripeSection from "@/components/StripeSection";

export default function Home() {
  return (
    <main className='min-h-screen bg-[#0b0f19] bg-dots flex items-center justify-center overflow-hidden'>
      <div className='w-full max-w-7xl px-4 flex items-center justify-center overflow-x-auto'>
        <StripeSection />
      </div>
    </main>
  );
}
