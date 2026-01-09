import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ShieldCheck, Layers, Minimize2 } from "lucide-react";

interface TechSpecProps {
    trigger?: React.ReactNode;
}

export function TechSpecsModal({ trigger }: TechSpecProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger || <span className="underline cursor-pointer decoration-dotted text-stone-500 hover:text-[#B49286]">View Tech Specs</span>}
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-[#FAF9F6]">
                <DialogHeader>
                    <DialogTitle className="font-serif text-2xl text-[#2C2420]">Guitar Tech™ Engineering</DialogTitle>
                    <DialogDescription>
                        Why this is the safest choice for BBL recovery and high-compression contouring.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div className="bg-white p-6 rounded-xl border border-stone-100">
                        <div className="w-10 h-10 bg-[#D1AB66]/10 rounded-full flex items-center justify-center mb-4">
                            <Layers className="w-5 h-5 text-[#D1AB66]" />
                        </div>
                        <h3 className="font-bold text-[#2C2420] mb-2">3-Layer Powernet</h3>
                        <p className="text-sm text-stone-600 leading-relaxed">
                            Medical-grade compression focused on the waist and abdomen. Provides maximum snatching (Stage 2) without restricting blood flow.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-stone-100">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                            <Minimize2 className="w-5 h-5 text-purple-600" />
                        </div>
                        <h3 className="font-bold text-[#2C2420] mb-2">Zero-Compression Mesh</h3>
                        <p className="text-sm text-stone-600 leading-relaxed">
                            Located at the hips and buttocks (The "Pockets"). High-stretch lycra that imposes ZERO pressure on fat cells, crucial for BBL survival.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-stone-100">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                            <ShieldCheck className="w-5 h-5 text-blue-600" />
                        </div>
                        <h3 className="font-bold text-[#2C2420] mb-2">Silicone Anti-Roll</h3>
                        <p className="text-sm text-stone-600 leading-relaxed">
                            Wavy silicone lace pattern on legs prevents rolling up. Unlike straight silicone, it allows for thigh expansion while sitting.
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
