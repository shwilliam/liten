const Hero = () => (
  <div className="my-32 md:my-48 md:mb-20">
    <div className="container px-4 sm:px-8 md:px-2 lg:px-0 lg:px-16 xl:px-20 mx-auto text-center">
      <p className="font-serif italic text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-tight">
        Short links that do more.
      </p>
      <p className="text-gray-800 text-base leading-relaxed mt-8 px-4 max-w-xl mx-auto">
        Make your brand stand out with unique URLs and customized link previews
        to impress on all social platforms.
      </p>
      <a
        className="inline-block mt-16 mb-2 px-3 py-2 border-4 border-blue-500 hover:bg-blue-500 hover:text-white bg-white text-blue-500 font-bold"
        href="#try"
      >
        Try it out!
      </a>
    </div>
  </div>
)

export default Hero
