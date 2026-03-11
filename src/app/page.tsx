import StripeSection from "@/components/StripeSection";

export default function Home() {
  return (
    <main className='min-h-screen bg-[#0b0f19] bg-dots flex items-center justify-center overflow-hidden'>
      <div className='w-full flex items-center justify-center'>
        <StripeSection />
      </div>
    </main>
  );
}
