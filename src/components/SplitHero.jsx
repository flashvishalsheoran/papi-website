import { Link, useNavigate } from 'react-router-dom'

export default function SplitHero() {
  const navigate = useNavigate()

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Responsive Grid: 2 columns on all screen sizes */}
      <div className="grid h-full grid-cols-2">
        {/* Buyer Panel */}
        <div
          onClick={() => navigate('/buyer')}
          className="group relative flex cursor-pointer items-center justify-start overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
            style={{ backgroundImage: 'url(/images/seller-hero.jpg)' }}
          />
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Left aligned text, vertically centered */}
          <div className="relative z-10 px-8 text-left text-white md:px-16">
            <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-white/30 p-2 shadow-2xl backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 md:mb-6 md:h-24 md:w-24">
              <img
                src="/images/buyer_logo.png"
                alt="Buyer Icon"
                className="max-h-[80%] max-w-[80%] object-contain"
              />
            </div>
            <h2 className="mb-3 text-4xl font-black drop-shadow-lg md:text-5xl lg:text-6xl">
              Buyer
            </h2>
            <p className="text-lg font-semibold drop-shadow-lg md:text-xl">
              Browse fresh produce
            </p>
          </div>
        </div>

        {/* Seller Panel */}
        <div
          onClick={() => navigate('/auth/login?role=seller')}
          className="group relative flex cursor-pointer items-center justify-end overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
            style={{ backgroundImage: 'url(/images/seller-selling.jpg)' }}
          />
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Right aligned text, vertically centered */}
          <div className="relative z-10 px-8 text-right text-white md:px-16">
            <div className="mb-4 ml-auto inline-flex h-20 w-20 items-center justify-center rounded-full bg-white/30 p-2 shadow-2xl backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 md:mb-6 md:h-24 md:w-24">
              <img
                src="/images/seller_logo.png"
                alt="Seller Icon"
                className="max-h-[80%] max-w-[80%] object-contain"
              />
            </div>
            <h2 className="mb-3 text-4xl font-black drop-shadow-lg md:text-5xl lg:text-6xl">
              Seller
            </h2>
            <p className="text-lg font-semibold drop-shadow-lg md:text-xl">
              List your products
            </p>
          </div>
        </div>
      </div>

      {/* Center Logo Overlay - Larger and Responsive */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-30 w-[75vw] max-w-sm -translate-x-1/2 -translate-y-1/2 transform sm:w-[65vw] md:max-w-md lg:max-w-lg xl:max-w-xl">
        <div className="relative animate-[float_3s_ease-in-out_infinite]">
          {/* Main Logo with Shine Effect */}
          <div className="relative transform transition-transform duration-500 group-hover:scale-105">
            {/* White blur highlight */}
            <div className="absolute -inset-4 z-0 rounded-full bg-white/50 opacity-75 blur-2xl transition-all duration-500 group-hover:opacity-100"></div>

            <div className="relative overflow-hidden rounded-full">
              <img
                src="/images/jhonny_main.png"
                alt="Jhonny - PAPI Marketplace"
                className="relative z-10 h-auto w-full object-contain drop-shadow-2xl"
              />
              {/* Shine pseudo-element */}
              <div className="absolute top-0 -left-full h-full w-1/2 
                  bg-gradient-to-r from-transparent via-white/50 to-transparent 
                  transition-all duration-700 ease-in-out group-hover:left-full 
                  -skew-x-12 z-20">
              </div>
            </div>
          </div>

          {/* About Me Image Below Logo */}
          <div className="mt-8 text-center">
            <Link to="/about" className="group/about pointer-events-auto inline-block cursor-pointer transition-transform duration-300 hover:scale-105">
              <img
                src="/images/about_me.png"
                alt="About me"
                className="inline-block h-auto w-48 rounded-full shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)] transition-shadow duration-300 group-hover/about:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.4)] md:w-64"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  )
}
