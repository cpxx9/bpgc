const ScoreCardsSkeleton = () => {
  return (
    <section className="mx-auto max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card */}
        <article className="flex flex-col">
          <div className="bg-sky-600/70 h-44 flex flex-col justify-between p-4 text-center text-white">
            <h2 className="font-bold text-2xl">Birdie Busters</h2>
            <p className="font-semibold">Clubhouse Leader</p>
          </div>

          <div className="bg-neutral-700 p-4 text-white">Loading...</div>
        </article>

        <article className="flex flex-col">
          <div className="bg-sky-600/70 h-44 flex flex-col justify-between p-4 text-center text-white">
            <h2 className="font-bold text-2xl">Closest-to-Pin / Hole-in-One</h2>
            <p className="font-semibold">Clubhouse Leader</p>
          </div>

          <div className="bg-neutral-700 p-4 text-white">Loading...</div>
        </article>

        <article className="flex flex-col">
          <div className="bg-sky-600/70 h-44 flex flex-col justify-between p-4 text-center text-white">
            <h2 className="font-bold text-2xl">Snowmen</h2>
            <p className="font-semibold">Clubhouse Leader</p>
          </div>

          <div className="bg-neutral-700 p-4 text-white">Loading...</div>
        </article>
      </div>
    </section>
  );
};

export default ScoreCardsSkeleton;
