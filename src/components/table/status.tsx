import React from "react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../../ui/tooltip"
import {Button} from "../../ui/button";




export function Status ( props: any ) {
    const status = props.status
    const type = props.type
    let statuses:any[] = []
    if(type === 'order') {
        statuses = [
            {label: 'CREATED', color: 'bg-bar_created', width: '0', text: 'Creado'},
            {label: 'CONFIRMED', color: 'bg-bar_confirmed', width: 'calc(25% + 4px)', text: 'Confirmado'},
            {label: 'IN_PROGRESS', color: 'bg-bar_inprogress', width: 'calc(50% + 4px)', text: 'En Progreso'},
            {label: 'SENT', color: 'bg-bar_sent', width: 'calc(75% + 4px)', text: 'Enviado'},
            {label: 'DELIVERED', color: 'bg-bar_delivered', width: '100%', text: 'Entregado'},
            {label: 'CANCELLED', color: 'bg-bar_cancelled', width: '100%', text: 'Cancelado'},
            {label: 'RETURNED', color: 'bg-bar_returned', width: '100%', text: 'Devuelto'},
        ]
    }
    if(type === 'project') {
        statuses = [
            {label: 'CREATED', color: 'bg-bar_created', width: '0', text: 'Creado'},
            {label: 'IN_PROGRESS', color: 'bg-bar_inprogress', width: 'calc(50% + 4px)', text: 'En Progreso'},
            {label: 'COMPLETED', color: 'bg-bar_completed', width: '100%', text: 'Completado'},
        ]
    }

    const statusObj = statuses.find((s) => s.label === status)

    return (
        <TooltipProvider>
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
