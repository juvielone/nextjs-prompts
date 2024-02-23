import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover and Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI Powered Prompts</span>
      </h1>

      <p className="desc text-center">
        Prompt Share is an AI Prompting tool for modern world to Discover and
        Share creative Prompts.
      </p>

      <Feed />
    </section>
  );
};

export default Home;
