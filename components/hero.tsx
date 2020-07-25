import IconHero from './icon-hero'

const Hero = () => (
  <div className="py-16">
    <div className="container px-4 sm:px-8 lg:px-16 xl:px-20 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="col-span-6">
          <p className="font-bold text-4xl md:text-6xl max-w-xl text-gray-900 leading-tight">
            Personalized short links
          </p>
          <hr className="w-12 h-1 bg-orange-500 rounded-full mt-8" />
          <p className="text-gray-800 text-base leading-relaxed mt-8 font-semibold">
            Make your brand stand out with unique links and customized previews
          </p>
        </div>

        <div className="col-span-6 my-20">
          <IconHero />
        </div>
      </div>
    </div>
  </div>
)

export default Hero
