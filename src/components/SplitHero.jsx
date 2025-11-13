import { useNavigate } from 'react-router-dom'
import { ShoppingBasket, Tractor } from 'lucide-react'

export default function SplitHero() {
  const navigate = useNavigate()

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="grid h-full md:grid-cols-2">
        {/* Buyer Panel */}
        <div
          onClick={() => navigate('/buyer')}
          className="group relative flex cursor-pointer items-center justify-start overflow-hidden bg-gradient-to-br from-green-50 to-green-100 transition-all duration-500 hover:scale-105"
          style={{
            backgroundImage: 'url(/images/buyer-hero.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Lighter overlay - increased opacity to reduce image visibility */}
          <div className="absolute inset-0 bg-green-900/70 transition-all duration-500 group-hover:bg-green-900/60"></div>
          
          {/* Left aligned text, vertically centered */}
          <div className="relative z-10 px-12 text-left text-white md:px-16">
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-white/30 shadow-2xl backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
              <ShoppingBasket className="h-10 w-10 drop-shadow-lg" strokeWidth={2} />
            </div>
            <h2 className="mb-3 text-5xl font-black drop-shadow-2xl md:text-6xl">
              I am a Buyer
            </h2>
            <p className="text-xl font-semibold drop-shadow-lg">Browse fresh produce</p>
          </div>
        </div>

        {/* Seller Panel */}
        <div
          onClick={() => navigate('/auth/login?role=seller')}
          className="group relative flex cursor-pointer items-center justify-end overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100 transition-all duration-500 hover:scale-105"
          style={{
            backgroundImage: 'url(/images/seller-hero.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Lighter overlay - increased opacity to reduce image visibility */}
          <div className="absolute inset-0 bg-amber-900/70 transition-all duration-500 group-hover:bg-amber-900/60"></div>
          
          {/* Right aligned text, vertically centered */}
          <div className="relative z-10 px-12 text-right text-white md:px-16">
            <div className="mb-6 ml-auto inline-flex h-20 w-20 items-center justify-center rounded-full bg-white/30 shadow-2xl backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
              <Tractor className="h-10 w-10 drop-shadow-lg" strokeWidth={2} />
            </div>
            <h2 className="mb-3 text-5xl font-black drop-shadow-2xl md:text-6xl">
              I am a Seller
            </h2>
            <p className="text-xl font-semibold drop-shadow-lg">List your products</p>
          </div>
        </div>
      </div>

      {/* Center Logo Overlay - Elevated Circle (20% smaller) */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 transform">
        <div className="relative animate-[float_3s_ease-in-out_infinite]">
          {/* Reduced blur - lighter shadow layers */}
          <div className="absolute -inset-12 rounded-full bg-gradient-to-br from-green-400/20 to-amber-400/20 blur-xl"></div>
          <div className="absolute -inset-8 rounded-full bg-white/40 blur-lg"></div>
          
          {/* Main Large Circular Logo Container - 3D elevated (20% smaller) */}
          <div className="relative transform transition-transform duration-500 hover:scale-105">
            <div className="rounded-full bg-white p-6 shadow-[0_40px_70px_-15px_rgba(0,0,0,0.4)] ring-[10px] ring-white/90 backdrop-blur-sm">
              {/* Inner circular shadow for depth */}
              <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_25px_rgba(0,0,0,0.06)]"></div>
              
              {/* The Full Image - 20% smaller */}
              <div className="relative flex h-64 w-64 items-center justify-center rounded-full bg-white md:h-[19rem] md:w-[19rem] lg:h-[22.5rem] lg:w-[22.5rem]">
                <img
                  src="/images/Jonny.jpeg"
                  alt="PAPI - Fresh Produce Marketplace"
                  className="relative z-10 h-full w-full rounded-full object-contain p-3 drop-shadow-2xl"
                />
              </div>
            </div>

            {/* Floating particles effect */}
            <div className="absolute -left-6 top-8 h-4 w-4 animate-ping rounded-full bg-green-400 opacity-75"></div>
            <div className="absolute -right-6 top-8 h-3 w-3 animate-ping rounded-full bg-amber-400 opacity-75 delay-100"></div>
            <div className="absolute -bottom-6 -left-6 h-3 w-3 animate-ping rounded-full bg-green-300 opacity-75 delay-200"></div>
            <div className="absolute -bottom-6 -right-6 h-4 w-4 animate-ping rounded-full bg-amber-300 opacity-75 delay-300"></div>
          </div>

          {/* Brand Text Below Logo - 20% smaller */}
          <div className="mt-12 text-center">
            <div className="inline-block rounded-full bg-white px-8 py-4 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)] ring-5 ring-white/80 backdrop-blur-sm">
              <h1 className="bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-3xl font-black text-transparent md:text-4xl">
                PAPI
              </h1>
              <p className="mt-1 text-sm font-semibold text-gray-600 md:text-base">
                Fresh. Local. Organic.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
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
