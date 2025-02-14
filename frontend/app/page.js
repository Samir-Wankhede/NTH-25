
export default function Home() {
  return (
    <div className="w-screen h-full overflow-hidden">
      <img
        src={`main-bg.webp`}
        alt="Background"
        className="absolute w-full h-full bottom-0 object-cover xl:object-fill opacity-75 z-0"
      />
      <main className="h-full flex justify-center items-center z-40 opacity-100 relative">
        <div className="text-white text-wrap text-6xl opacity-[100%] block p-8">NTH is under maintenance. We will be back soon!</div>
      </main>
    </div>
  );
}
