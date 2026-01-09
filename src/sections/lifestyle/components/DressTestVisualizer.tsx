import { Play, Pause } from 'lucide-react'
import { useState } from 'react'

export function DressTestVisualizer() {
    const [isPlaying, setIsPlaying] = useState(true)

    return (
        <div className="relative w-full aspect-[9/16] md:aspect-video bg-stone-900 rounded-2xl overflow-hidden group">

            {/* Video Placeholder (Simulated) */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center opacity-50">
                    <span className="text-6xl animate-pulse">👗</span>
                    <p className="text-white mt-4 font-serif text-xl">Simulating Silk Dress Walk...</p>
                </div>

                {/* Split Screen Simulation for Dev Preview */}
                <div className="absolute inset-0 flex opacity-20">
                    <div className="w-1/2 h-full bg-red-900/30 flex items-center justify-center border-r border-white/20">
                        <span className="text-white font-bold -rotate-90">WITHOUT</span>
                    </div>
                    <div className="w-1/2 h-full bg-green-900/30 flex items-center justify-center">
                        <span className="text-white font-bold -rotate-90">WITH GUITAR CURVES</span>
                    </div>
                </div>
            </div>

            {/* Overlay Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-end justify-between">
                    <div>
                        <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded-full mb-2">
                            THE DRESS TEST
                        </span>
                        <h3 className="font-serif text-3xl text-white font-bold">Silk Never Lies.</h3>
                        <p className="text-stone-300 max-w-sm mt-2">
                            See how our seamless tech vanishes under the most unforgiving fabrics.
                        </p>
                    </div>

                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform"
                    >
                        {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
                    </button>
                </div>
            </div>
        </div>
    )
}
