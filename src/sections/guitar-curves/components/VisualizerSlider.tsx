
import { useState, useRef } from 'react'
import { MoveHorizontal } from 'lucide-react'

export function VisualizerSlider() {
    const [position, setPosition] = useState(50)
    const containerRef = useRef<HTMLDivElement>(null)

    const handleDrag = (e: React.MouseEvent | React.TouchEvent) => {
        if (!containerRef.current) return

        const rect = containerRef.current.getBoundingClientRect()
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX

        // Calculate percentage (0-100)
        let newPos = ((clientX - rect.left) / rect.width) * 100
        newPos = Math.max(0, Math.min(100, newPos))

        setPosition(newPos)
    }

    // Simple placeholder styles since we don't have real images
    return (
        <div className="w-full py-12 bg-stone-50">
            <div className="max-w-4xl mx-auto px-6">
                <h2 className="font-serif text-3xl text-center text-[#2C2420] mb-2">
                    The Guitar Fit Difference
                </h2>
                <p className="text-center text-stone-500 mb-8">
                    Drag to see how we solved the "Waist Gap" problem.
                </p>

                <div
                    ref={containerRef}
                    className="relative aspect-video rounded-xl overflow-hidden cursor-ew-resize border-4 border-white shadow-xl select-none"
                    onMouseMove={(e) => e.buttons === 1 && handleDrag(e)}
                    onTouchMove={handleDrag}
                    onClick={handleDrag}
                >
                    {/* AFTER Image (Guitar Fit) - Base layer */}
                    <div className="absolute inset-0 bg-[#F5EDDF] flex items-center justify-center">
                        <div className="text-center">
                            <span className="text-6xl mb-4 block">⌛</span>
                            <h3 className="font-serif text-2xl text-[#A35944] font-bold">Guitar Tech™ Fit</h3>
                            <p className="text-[#2C2420] font-medium mt-2">Snatched Waist. Projected Glutes.</p>
                        </div>
                    </div>

                    {/* BEFORE Image (Standard Fit) - clipped layer */}
                    <div
                        className="absolute inset-0 bg-stone-200 border-r-2 border-white flex items-center justify-center overflow-hidden"
                        style={{ width: `${position}% ` }}
                    >
                        <div className="w-full text-center" style={{ width: `${10000 / position}% ` }}>
                            {/* Counter-scale content to keep it centered relative to full width logic if needed, 
                   but for simple div placeholders, just centering is fine. 
                   Actually, let's just center content normally. The clipping hides it.
               */}
                            <div className="absolute inset-0 flex items-center justify-center w-screen max-w-4xl mx-auto">
                                <div className="text-center">
                                    <span className="text-6xl mb-4 block">⬜</span>
                                    <h3 className="font-serif text-2xl text-stone-500 font-bold">Standard Brand</h3>
                                    <p className="text-stone-400 font-medium mt-2">Waist Gapping & Flattened Shapes</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Slider Handle */}
                    <div
                        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_10px_rgba(0,0,0,0.3)] z-10 flex items-center justify-center"
                        style={{ left: `${position}% ` }}
                    >
                        <div className="w-10 h-10 bg-[#D1AB66] rounded-full border-2 border-white flex items-center justify-center shadow-lg">
                            <MoveHorizontal className="text-white w-5 h-5" />
                        </div>
                    </div>

                    {/* Dynamic Label */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-bold backdrop-blur-sm pointer-events-none">
                        {position < 50 ? 'Visualizing Gap Problem' : 'Visualizing Guitar Solution'}
                    </div>
                </div>
            </div>
        </div>
    )
}
