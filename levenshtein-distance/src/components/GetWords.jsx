const GetWords = ({
  setCorrectWord,
  setWrongWord,
  setWordsReady,
  correctWord,
  wrongWord,
}) => {
  const onSubmit = (e) => {
    e.preventDefault();
    if (!correctWord || !wrongWord) return;
    setWordsReady(true);
  };

  return (
    <section>
      <form className="flex flex-col gap-6 text-zinc-900 dark:text-zinc-100">
        <div>
          <label
            htmlFor="correct_word"
            className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
          >
            Spelled Word
          </label>
          <input
            id="correct_word"
            type="text"
            value={correctWord}
            onChange={(e) => setCorrectWord(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="wrong_word"
            className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
          >
            Misspelled Word
          </label>
          <input
            id="wrong_word"
            type="text"
            value={wrongWord}
            onChange={(e) => setWrongWord(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          onClick={onSubmit}
          className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
        >
          Submit Words
          <svg
            className="w-5 h-5 ml-2 -mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </form>
    </section>
  );
};

export default GetWords;
