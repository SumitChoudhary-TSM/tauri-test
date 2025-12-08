const Error404 = () => {
  return (
    <div className="min-w-screen h-[93.5vh] fixed flex flex-wrap text-center items-center justify-center bg-gray-100">
      <div className="flex-[0_0_100%] lg:flex-[0_0_30%] items-center lg:items-end">
        <p className="text-[10em] box-border text-gray-700" style={{ fontFamily: "'Comic Neue', cursive" }}>
          4<span className="text-red-500">0</span>4
        </p>
        <p
          className="text-[2em] leading-12.5 box-border text-gray-600 w-full px-5 lg:px-0 max-lg:text-[1.7em] max-lg:leading-8.75"
          style={{ fontFamily: "'Comic Neue', cursive" }}
        >
          The page you are looking for <br />
          does <span className="text-red-500">NOT</span> exist.
        </p>
      </div>
    </div>
  );
};

export default Error404;
