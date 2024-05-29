import Navbar from "@/components/custom/Header/Navbar"

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    <Navbar></Navbar>
      <div>{children}</div>
    </>
  )
}