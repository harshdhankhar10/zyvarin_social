
import { Linkedin, Twitter, Globe, Book, Code } from 'lucide-react'

export const getProviderIcon = (provider: string) => {
  switch(provider) {
    case 'linkedin': return Linkedin
    case 'twitter': return Twitter
    case 'medium': return Book
    case 'devto': return Code 
    default: return Globe
  }
}

export const getProviderColor = (provider: string) => {
  switch(provider) {
    case 'linkedin': return 'text-[#0077b5]'
    case 'twitter': return 'text-black'
    case 'medium': return 'text-[#00ab6c]'
    case 'devto': return 'text-[#0a0a0a]' 
    default: return 'text-slate-800'
  }
}

export const getProviderBgColor = (provider: string) => {
  switch(provider) {
    case 'linkedin': return 'bg-blue-50'
    case 'twitter': return 'bg-slate-50'
    case 'medium': return 'bg-green-50'
    case 'devto': return 'bg-gray-50' 
    default: return 'bg-slate-50'
  }
}

export const getProviderLabel = (provider: string) => {
  switch(provider) {
    case 'linkedin': return 'LinkedIn'
    case 'twitter': return 'Twitter'
    case 'medium': return 'Medium'
    case 'devto': return 'Dev.to'
    default: return provider
  }
}

export const getUsername = (provider: string, profileData: any) => {
  if (!profileData) return ''
  switch(provider) {
    case 'linkedin': return profileData.name || 'LinkedIn Account'
    case 'twitter': return `@${profileData.username || 'user'}`
    case 'medium': return `@${profileData.username || 'user'}`
    case 'devto': return `@${profileData.username || 'user'}`
    default: return ''
  }
}

export const getProfileImage = (provider: string, connectedAccounts: any[]) => {
  const account = connectedAccounts.find(acc => acc.provider === provider)
  if (!account?.profileData) return null
  
  switch(provider) {
    case 'linkedin': return account.profileData.picture
    case 'twitter': return account.profileData.profile_image_url
    case 'medium': return account.profileData.imageUrl
    case 'devto': return account.profileData.profile_image
    default: return null
  }
}