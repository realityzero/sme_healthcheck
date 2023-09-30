
import { url } from "inspector"
import Image from "next/image"
import Link from "next/link"
import React from "react"

// export default function Navbar() {
//   return (
//     // <section className="w-full bg-white text-zinc-900 " data-id="1">
//     //   <header className="py-4" data-id="2">
//         <div className="container w-full bg-white text-zinc-900 mx-auto px-4 md:px-6 fixed border-b border-gray-200" data-id="1">
//           <nav className="flex items-center justify-between" data-id="4">
//             <div data-id="5">
//               <Image
//                 alt="Logo"
//                 src="/credilinq-logo.svg"
//                 width={70}
//                 height={70}
//               />

//             </div>
//             <div className="space-x-4 text-2xl font-bold" data-id="6">
//               {/* <Link className="text-zinc-900 hover:text-zinc-700" data-id="7" href="#">
//                 Home
//               </Link>
//               <Link className="text-zinc-900 hover:text-zinc-700" data-id="8" href="#">
//                 Politics
//               </Link>
//               <Link className="text-zinc-900 hover:text-zinc-700" data-id="9" href="#">
//                 Business
//               </Link>
//               <Link className="text-zinc-900 hover:text-zinc-700" data-id="10" href="#">
//                 Tech
//               </Link>
//               <Link className="text-zinc-900 hover:text-zinc-700" data-id="11" href="#">
//                 Culture
//               </Link>
//               <Link className="text-zinc-900 hover:text-zinc-700" data-id="12" href="#">
//                 Sports
//               </Link> */}
//               SME HealthCheck - Get Started
//             </div>
//           </nav>
//         </div>
//     //   </header>
//     // </section>
//   )
// }

export default function Navbar() {
    return (
      <nav className="w-full" style={{backgroundImage: `url('/header-bg.jpg')`}}>
        <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-16">
          <div className="flex items-center justify-between py-3 md:py-6 md:block">
            <Image
                alt="Logo"
                src="/credilinq-logo-1.svg"
                width={100}
                height={100}
            />
          </div>
          <div
            className="flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 block"
          >
            <div className="justify-end items-center space-y-8 md:flex md:space-x-6 md:space-y-0 text-white">
              SME HealthCheck - Get Started
            </div>
          </div>
        </div>
      </nav>
    )
  }