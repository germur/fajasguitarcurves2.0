

interface ComfortMeterProps {
    usage: string
    level: number // 0-100
}

export function ComfortMeter({ usage, level }: ComfortMeterProps) {
    // Determine color and icon based on level (High comfort = Green/Blue, Low comfort/High compression = Orange/Red)
    // Actually, for "Luxury" feel, let's use brand colors.
    // High Comfort (Office) = Soft Beige/Green
    // High Compression (Event) = Gold/Bronze

    let colorClass = "bg-green-500"
    let labelColor = "text-green-700"

    if (level < 50) { // Ultra compression, less comfort
        colorClass = "bg-[#A35944]" // Intense Terra
        labelColor = "text-[#A35944]"
    } else if (level < 80) {
        colorClass = "bg-[#D1AB66]" // Gold
        labelColor = "text-[#8c6b30]"
    } else {
        colorClass = "bg-[#2C2420]" // Dark, stable
        labelColor = "text-[#2C2420]"
    }

    return (
        <div className="mt-3">
            <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-bold text-stone-500 uppercase tracking-wider">Comfort Meter</span>
                <span className={`font-bold ${labelColor}`}>{usage}</span>
            </div>

            {/* Bar Container */}
            <div className="h-2 w-full bg-stone-200 rounded-full overflow-hidden relative">
                {/* Fill */}
                <div
                    className={`h-full ${colorClass} transition-all duration-500 rounded-full`}
                    style={{ width: `${level}%` }}
                />

                {/* Ticks for visual tech feel */}
                <div className="absolute inset-0 flex justify-between px-1">
                    <div className="w-[1px] h-full bg-white/50" style={{ left: '33%' }} />
                    <div className="w-[1px] h-full bg-white/50" style={{ left: '66%' }} />
                </div>
            </div>
        </div>
    )
}
