function Loading ({isLoading}) {
    return (
        <div className={`flex flex-col fixed inset-0 z-50 items-center justify-center bg-white/70 ${isLoading ? '': 'hidden'}`}>
            <div className='w-12 h-12 border-4 border-(--theme-background) border-t-transparent rounded-full animate-spin'></div>
        </div>
    )
}

export default Loading