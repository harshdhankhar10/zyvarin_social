export default function AccountRestricted() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-6">
          <svg className="w-24 h-24 mx-auto text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4v2m0 4v2M6.343 3h11.314A2 2 0 0119 5v2a2 2 0 01-2 2h-.5l-.5 6h.5a2 2 0 012 2v2a2 2 0 01-2 2H7a2 2 0 01-2-2v-2a2 2 0 012-2h.5l-.5-6h-.5a2 2 0 01-2-2V5a2 2 0 012-2z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Restricted</h1>
        <p className="text-gray-600 mb-6">
          Your account has been restricted or suspended. You cannot access your dashboard at this time.
        </p>
        <p className="text-sm text-gray-500">
          If you believe this is a mistake, please contact support for assistance.
        </p>
      </div>
    </div>
  )
}
