import LinkButton from './link-button'

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
      <LinkButton className="my-16" href="#try">
        Try it out!
      </LinkButton>
    </div>
  </div>
)

export default Hero
