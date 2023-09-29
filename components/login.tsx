'use client'
import { signIn } from "next-auth/react"
import Image from "next/image"
import { TypeAnimation } from "react-type-animation"
const Login = () => {
  return (
    <div className="flex justify-center items-center bg-black flex-col pt-10 pb-96">
      <div className="bg-black w-full flex flex-col items-center justify-center text-center">
        <Image
          src="/gpt.png"
          width={300}
          height={300}
          alt="logo"
        />

        <h1 className="text-white py-4 font-bold text-2xl" >
          <TypeAnimation
            preRenderFirstString={true}
            sequence={[
              500,
              'Get Started', // initially rendered starting point
              3000,
              'Write a JS code to generate a text',
              1000,
              'Write Like Shakespeare',
              1000,
            ]}
            speed={50}
            style={{ fontSize: '2em' }}
            repeat={Infinity}
          />
        </h1>
        <div className="space-x-3">
          <button onClick={() => signIn("google")} className="text-white bg-blue-700 px-4 py-2 hover:bg-[#0000ff] rounded-md font-bold text-xl">Sign in</button>
          <button onClick={() => signIn("google")} className="text-white bg-blue-700 px-4 py-2 hover:bg-[#0000ff] rounded-md font-bold text-xl">Log In</button>

        </div>

      </div>
    </div>
  )
}

export default Login