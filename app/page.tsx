import Footer from '@/components/ui/footer'
import { ProfileForm } from '@/components/ui/healthCheckForm'
import Navbar from '@/components/ui/navbar'

export default function Home() {

  return (

    <>
    <Navbar></Navbar>
    <div className="bg-slate-50">
      <div className="bg-white flex justify-center items-center h-full mx-4 sm:mx-8 md:mx-16 lg:mx-32" style={{
        boxShadow: "0 0 50px rgba(0, 0, 0, 0.2)",
      }}>
        <div className='w-screen mx-4 mt-10 sm:mx-8 md:mx-12 lg:mx-16 xl:mx-20'>

          <ProfileForm></ProfileForm>
        </div>
      
      </div>
    </div>
    <Footer></Footer>
    </>
  )
}
