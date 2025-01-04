const NumbersContainer = ({title, subtitle})=>{
    return (
        <div className="flex flex-col items-center justify-center gap-2 border border-slate-800 h-[170px] w-[300px] sm:h-[120px] sm:w-[190px] shadow-md bg-[#1f385b] text-white rounded-lg">
            <h2 className="text-5xl sm:text-4xl font-serif font-medium">{title}</h2>
            <h5 className="text-sm sm:text-xs font-semibold">{subtitle}</h5>
        </div>
      )
}

export default NumbersContainer;