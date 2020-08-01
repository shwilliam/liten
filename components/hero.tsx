import IconHero from './icon-hero'

const Hero = () => (
  <div className="py-16 md:py-24 md:mb-20">
    <div className="container px-4 sm:px-8 md:px-2 lg:px-0 lg:px-16 xl:px-20 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="col-span-6">
          <p className="font-bold text-4xl md:text-6xl max-w-xl text-gray-900 leading-tight -mr-1 xl:mr-2">
            Short links that do more
          </p>
          <hr className="w-12 h-1 bg-orange-600 rounded-full mt-8" />
          <p className="text-gray-800 text-base leading-relaxed mt-8 font-semibold">
            Make your brand stand out with unique URLs and customized link
            previews to impress on all social platforms
          </p>
        </div>

        <div className="col-span-6">
          <IconHero />
        </div>
      </div>
    </div>
  </div>
)

export default Hero
