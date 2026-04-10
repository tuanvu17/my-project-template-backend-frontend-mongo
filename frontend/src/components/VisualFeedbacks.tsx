const SomethingWentWrong = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md p-4 bg-white  rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
        <p>Sorry, something went wrong. Please try again later.</p>
        <button
          onClick={() => (location.href = "/")}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Go back home
        </button>
      </div>
    </div>
  );
};

export const PageLoading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md p-4 bg-white  rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Loading...</h1>
      </div>
    </div>
  );
};

export const NotFoundPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md p-4 bg-white  rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Page not found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <button
          onClick={() => (location.href = "/")}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Go back home
        </button>
      </div>
    </div>
  );
};

export default SomethingWentWrong;
