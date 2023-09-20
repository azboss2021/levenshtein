import { FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <section className="fixed bottom-2">
      <div className="flex justify-center text-sm mb-2">
        <h3 className="flex gap-1 dark:text-white">
          Made By
          <a
            href="https://github.com/azboss2021/levenshtein"
            target="#"
            className="flex gap-2 items-center"
          >
            Caleb Wilson <FaGithub className="inline text-xl" />
          </a>
        </h3>
      </div>
    </section>
  );
}

export default Footer;
