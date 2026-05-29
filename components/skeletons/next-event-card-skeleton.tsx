const NextEventCardSkeleton = () => {
  return (
    <>
      <h3 className="text-4xl font-black tracking-[0.2em] text-center mb-4 text-yellow-300">
        ...
      </h3>
      <h4 className="text-2xl font-extrabold text-[rgb(247,154,14)]">
        DATE: ...
      </h4>
      <h4 className="text-2xl font-extrabold text-[rgb(247,154,14)]">
        COURSE: ...
      </h4>
      <h4 className="text-2xl font-extrabold text-[rgb(247,154,14)]">
        CHECK-IN: ...
      </h4>
      <h4 className="text-2xl font-extrabold text-[rgb(247,154,14)]">
        1ST TEE TIME: ...
      </h4>
      <h4 className="text-xl font-extrabold text-blue-300 underline hover:text-blue-300/75">
        <a target="_blank" href="https://www.nbcconnecticut.com/weather/">
          WEATHER FORECAST (CLICK HERE)
        </a>
      </h4>
    </>
  );
};

export default NextEventCardSkeleton;
