import React from "react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../../../ui/tooltip"
import {Button} from "../../../ui/button";

export function Status ( status: any ) {
    status = status.status
    const statuses = [
        { label: 'CREATED', color: 'bg-bar_backlog', width: '0', text: 'CREADA' },
        { label: 'PENDING', color: 'bg-bar_todo', width: 'calc(25% + 4px)', text: 'PENDIENTE' },
        { label: 'IN_PROGRESS', color: 'bg-bar_inprogress', width: 'calc(50% + 4px)', text: 'EN PROGRESO' },
        { label: 'VERIFY', color: 'bg-bar_verify', width: 'calc(75% + 4px)', text: 'VERIFICAR' },
        { label: 'DELIVERED', color: 'bg-bar_done', width: '100%', text: 'ENTREGADA' },
        { label: 'CANCELLED', color: 'bg-bar_todo', width: '100%', text: 'CANCELADA' },
    ]

    const statusObj = statuses.find((s) => s.label === status)

    return (
        <TooltipProvider delayDuration={0}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <span className={`block background w-44 min-w-max h-4`}>
                        <div className={`background w-44 bg-bar_backlog h-4 rounded-full absolute`}>
                            <div className={`active ${statusObj?.color} h-4 rounded-full absolute`}
                                 style={{
                                     width: statusObj?.width,
                                 }}>
                            </div>
                            <div
                                className={`dots w-full h-4 rounded-full absolute flex justify-between items-center`}
                                style={{
                                    marginLeft: '20%',
                                    width: 'calc(100% - 20% - 4px)',
                                }}>
                                <div className={`dot w-1.5 h-1.5 rounded-full bg-white`}></div>
                                <div className={`dot w-1.5 h-1.5 rounded-full bg-white`}></div>
                                <div className={`dot w-1.5 h-1.5 rounded-full bg-white`}></div>
                                <div className={`dot w-1.5 h-1.5 rounded-full bg-white`}></div>
                            </div>
                        </div>
                    </span>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{statusObj.text}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
