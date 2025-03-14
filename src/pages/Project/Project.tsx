import React, {useEffect} from "react";

import {useParams} from "react-router-dom";
import {DataTable} from "../../components/table/table";
import {Button} from "../../ui/button";
import {CalendarIcon, DownloadIcon, Loader2, Calculator, CreditCard, Settings, Smile, User,} from "lucide-react";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "../../ui/select";
import {projectStatusses} from "../../components/table/data";
import {Separator} from "../../ui/separator";
import {Popover, PopoverContent, PopoverTrigger} from "../../ui/popover";
import {cn} from "../../lib/utils";
import {format} from "date-fns";
import {es} from "date-fns/locale/es";
import {Calendar} from "../../ui/calendar";
import api from "../../utils/Api";
import {toast} from "react-toastify";


export default function Project() {
    const { projectId } = useParams();


    const [projectStatus, setProjectStatus] = React.useState<string | undefined>(undefined)
    const [projectNumber, setProjectNumber] = React.useState<string | undefined>(undefined)
    const [creationDate, setCreationDate] = React.useState<Date>(undefined)
    const [endDate, setEndDate] = React.useState<Date>(undefined)



    // Fetch data
    useEffect(() => {
        api.get('/projects/' + projectId).then((res) => {
            setProjectStatus(res.projectStatus)
            setProjectNumber(res.projectNumber)
            setCreationDate(res.creationDate ? new Date(res.creationDate) : null)
            setEndDate(res.endDate ? new Date(format(res.endDate, "yyyy-MM-dd")) : null)
        }).catch((err) => {})
    }, []);

    function submitForm(event: React.SyntheticEvent) {
        event.preventDefault()

        const body = {
            projectStatus: projectStatus || null,
            endDate: endDate || null,
        }

        api.put('/projects/' + projectId, body).then((res) => {
            console.log(res)
            if(!!res) {
                toast.success('Guardado correctamente', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
            }
        }).catch((err) => {
            console.log(err)
        })

    }

    return (
        <>


            <div className="hidden h-full flex-col md:flex">
                <div
                    className="flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-30">
                    <h2 className="text-3xl font-bold tracking-tight w-full ">{projectNumber}</h2>
                    <div className="ml-auto flex w-full space-x-2 sm:justify-end items-end">
                        <div className={"w-[300px]"}>
                            <h3 className="text-sm font-normal text-muted-foreground px-1">Fecha de finalización</h3>
                            <div className={"flex items-center gap-3"}>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !endDate && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4"/>
                                            {endDate ? format(endDate, "PPP", {locale: es}) :
                                                <span>Seleccionar fecha</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            locale={es}
                                            mode="single"
                                            selected={endDate}
                                            onSelect={(date) => setEndDate(new Date(format(date, "yyyy-MM-dd")))}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                        <div className={"w-[300px]"}>
                            <h3 className="text-sm font-normal text-muted-foreground px-1">Estado</h3>
                            <Select
                                value={projectStatus}
                                onValueChange={(value) => {
                                    setProjectStatus(value)
                                }}
                            >
                                <SelectTrigger className="w-[300px] text-foreground">
                                    <SelectValue/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {Object.keys(projectStatusses).map((key) => (
                                            <SelectItem key={key} value={key}>
                                                {projectStatusses[key]}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button onClick={submitForm}>Guardar</Button>
                    </div>
                </div>
                <Separator/>
                <div className="h-full py-6">
                    <DataTable type={"orders"} id={projectId}/>
                </div>
            </div>
        </>
    )
}
