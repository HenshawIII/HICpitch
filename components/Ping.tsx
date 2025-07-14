import React from 'react'

export default function Ping() {
    return (
        <div>
            <div className="relative">
                <div className="absolute top-1 -left-4">
                    <span className="flex size-[11px]">
                        <span className="absolute inline-flex h-full opacity-75 w-full animate-ping rounded-full bg-primary"></span>
                        <span className="relative inline-flex size-[11px] rounded-full bg-primary"></span>
                        
                    </span>
                </div>
            </div>
        </div>
    )
}