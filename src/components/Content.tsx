import Slide from './Slide';

const Content = () => {
  return (
    <div className="container mx-auto mt-[5em] pb-[5em] flex flex-col items-center min-h-screen">
      <div>
        <p className="font-semibold text-5xl w-[20ch] text-center uppercase">
          Becoming a webflow wizard
        </p>
        <p className="text-[1em] mt-[1em] font-normal text-center">
          Interactions, Layout, & Custom Code
        </p>
      </div>
      <Slide />
    </div>
  );
};

export default Content;
