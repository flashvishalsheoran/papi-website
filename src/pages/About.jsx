import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Button from '../components/ui/Button'

export default function About() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-green-50 via-amber-50 to-white">
      {/* Decorative background shapes */}
      <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-green-200/50 blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-amber-200/50 blur-3xl"></div>
      
      <div className="container relative z-10 mx-auto max-w-4xl px-4 py-12 text-center md:py-20">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        
        <div className="rounded-2xl bg-white/80 p-8 shadow-2xl backdrop-blur-lg ring-1 ring-black/5">
          <div className="mb-8 flex justify-center">
            <img 
              src="/images/jhonny_main.png" 
              alt="Jhonny from Produce Papi"
              className="w-48 h-48 object-contain drop-shadow-2xl md:w-56 md:h-56"
            />
          </div>
          <h1 className="mb-6 text-3xl font-bold tracking-tight text-green-800 md:text-5xl">
            Welcome to <span className="text-amber-600">Produce Papi Connects</span>!
          </h1>
          <p className="mb-4 text-lg text-gray-700 md:text-xl">
            The go-to marketplace where fresh produce sellers show off their goods and buyers chase down the freshest deals around!
          </p>
          <p className="mb-8 text-lg text-gray-700 md:text-xl">
            It’s simple, free, and made for everyone in the produce world. Whether you’re selling pallets of peppers or picking up cases of cucumbers, Produce Papi makes it easy to connect, communicate, and keep the produce moving.
          </p>
          
          <div className="rounded-xl border-l-4 border-amber-500 bg-amber-50 p-6 text-center italic text-amber-900 shadow-inner">
            <p className="text-xl font-medium">
              “If Produce Papi helped make the connection, it should go on his trucks! He doesn’t charge for detention!”
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
