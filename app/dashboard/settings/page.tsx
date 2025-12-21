import { redirect } from 'next/navigation'

const Page = async () => {
  redirect('/dashboard/settings/profile')
}

export default Page