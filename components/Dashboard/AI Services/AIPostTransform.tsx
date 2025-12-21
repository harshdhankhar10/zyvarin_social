import React from 'react'

const AIPostTransform = () => {
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          
          <h3 className="text-xl font-semibold text-slate-900 mb-2">AI Post Transformation</h3>
          <p className="text-slate-600 mb-6">
            This feature is now integrated directly into the compose interface.
          </p>
          
          <div className="space-y-3 text-sm text-slate-500 text-left">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              <span>Click "Enhance" button to get AI suggestions</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              <span>View 3 different versions in the preview panel</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              <span>Select your preferred version with one click</span>
            </div>
          </div>
          
          <button 
            onClick={() => window.location.reload()}
            className="mt-8 w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Got it, continue composing
          </button>
          
          <p className="text-xs text-slate-400 mt-4">
            The AI enhancement panel will appear in the right sidebar when you click "Enhance"
          </p>
        </div>
      </div>
    </div>
  )
}

export default AIPostTransform