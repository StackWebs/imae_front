import React, {useEffect} from "react";

import {useParams} from "react-router-dom";
import api from "../../utils/Api";
import {Button} from "../../ui/button";
import {Separator} from "../../ui/separator";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../../ui/card";
import {Input} from "../../ui/input";
import {DataTable} from "../../components/table/table";
import {Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue, SelectGroup} from "../../ui/select";
import {statusess} from "../../components/table/data";
import { Calendar } from "../../ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../ui/popover"
import {cn} from "../../lib/utils";
import {CalendarIcon, DownloadIcon} from "lucide-react";
import { format } from "date-fns"
import {es} from "date-fns/locale/es";
import {Textarea} from "../../ui/textarea";
import { Label } from "recharts";

export default function Order() {
    const { orderId } = useParams();

    // TOP
    const [status, setStatus] = React.useState<string | undefined>(undefined)
    const [orderNumber, setOrderNumber] = React.useState<string | undefined>(undefined)
    const [sentDate, setSentDate] = React.useState<Date>(undefined)

    // Lateral 2
    const [estimatedDeliveryDate, setEstimatedDeliveryDate] = React.useState<Date>(undefined)
    const [deliveryDate, setDeliveryDate] = React.useState<Date>(undefined)

    // Central 3 => Paquetes
    const [packages, setPackages] = React.useState<any | undefined>(undefined)

    useEffect(() => {
        api.get('/orders/' + orderId).then((res) => {
            setStatus(res.status)
            setOrderNumber(res.orderNumber)
            setSentDate(new Date(res.sentDate))
            setEstimatedDeliveryDate(new Date(res.estimatedDeliveryDate))
            setDeliveryDate(new Date(res.deliveryDate))

            // Central 3 => Paquetes
            setPackages(res.packages)

            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }, []);

    function submitForm(event: React.SyntheticEvent) {
        event.preventDefault()
    }

    return (
        <>
            <div className="hidden h-full flex-col md:flex">
                <div className="flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-30">
                    <h2 className="text-3xl font-bold tracking-tight w-full ">{orderNumber}</h2>
                    <div className="ml-auto flex w-full space-x-2 sm:justify-end">
                        <Select
                            value={status}
                            onValueChange={(value) => {
                                setStatus(value)
                            }}
                        >
                            <SelectTrigger className="w-[300px] text-foreground">
                                <SelectValue/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {Object.keys(statusess).map((key) => (
                                        <SelectItem key={key} value={key}>
                                            {statusess[key]}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Button onClick={submitForm}>Guardar</Button>
                    </div>
                </div>
                <Separator/>
                <div className="h-full py-6">
                    <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_350px]">
                        <div className="hidden flex-col space-y-4 sm:flex md:order-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Lorem Ipsum</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <h3 className="text-sm font-normal text-muted-foreground">Cliente</h3>
                                    <div className={"flex items-center gap-3 "}>
                                        <Select
                                            value={status}
                                            onValueChange={(value) => {
                                                setStatus(value)
                                            }}
                                        >
                                            <SelectTrigger className="w-[300px] text-foreground">
                                                <SelectValue/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {Object.keys(statusess).map((key) => (
                                                        <SelectItem key={key} value={key}>
                                                            {statusess[key]}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <h3 className="text-sm font-normal text-muted-foreground pt-3">Transportista</h3>
                                    <div className={"flex items-center gap-3"}>
                                        <Select
                                            value={status}
                                            onValueChange={(value) => {
                                                setStatus(value)
                                            }}
                                        >
                                            <SelectTrigger className="w-[300px] text-foreground">
                                                <SelectValue/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {Object.keys(statusess).map((key) => (
                                                        <SelectItem key={key} value={key}>
                                                            {statusess[key]}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Fechas</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <h3 className="text-sm font-normal text-muted-foreground">Fecha de envio</h3>
                                    <div className={"flex items-center gap-3"}>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full justify-start text-left font-normal",
                                                        !sentDate && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4"/>
                                                    {sentDate ? format(sentDate, "PPP", {locale: es}) :
                                                        <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={sentDate}
                                                    onSelect={(date) => setSentDate(date)}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    <h3 className="text-sm font-normal text-muted-foreground pt-3">Fecha estimada de entrega</h3>
                                    <div className={"flex items-center gap-3"}>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full justify-start text-left font-normal",
                                                        !estimatedDeliveryDate && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4"/>
                                                    {estimatedDeliveryDate ? format(estimatedDeliveryDate, "PPP", {locale: es}) :
                                                        <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={estimatedDeliveryDate}
                                                    onSelect={(date) => setEstimatedDeliveryDate(date)}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    <h3 className="text-sm font-normal text-muted-foreground pt-3">Fecha de entrega</h3>
                                    <div className={"flex items-center gap-3"}>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full justify-start text-left font-normal",
                                                        !deliveryDate && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4"/>
                                                    {deliveryDate ? format(deliveryDate, "PPP", {locale: es}) :
                                                        <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={deliveryDate}
                                                    onSelect={(date) => setDeliveryDate(date)}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                <CardTitle>Documentos</CardTitle>
                                </CardHeader>
                                <CardContent>
                                <div className={"w-full flex items-center gap-3 pt-3"}>
                                        <Button variant="outline" className={"w-full justify-between"}>
                                            Factura
                                            <DownloadIcon className="ml-2 h-4 w-4"/>
                                        </Button>
                                    </div>
                                    <div className={"w-full flex items-center gap-3 pt-3"}>
                                        <Button variant="outline" className={"w-full justify-between"}>
                                            Albaran
                                            <DownloadIcon className="ml-2 h-4 w-4"/>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="md:order-1">
                            <div className={"w-full flex items-start gap-3"}>
                                <Card className={"w-full"}>
                                    <CardHeader>
                                        <CardTitle>Dirección de recogida</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className={"flex items-center gap-3"}>
                                            <Select
                                                value={status}
                                                onValueChange={(value) => {
                                                    setStatus(value)
                                                }}
                                            >
                                                <SelectTrigger className="w-full text-foreground">
                                                    <SelectValue/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {Object.keys(statusess).map((key) => (
                                                            <SelectItem key={key} value={key}>
                                                                {statusess[key]}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className={"flex items-center gap-3 pt-3"}>
                                            <div className={"w-full"}>
                                                <h3 className="text-sm font-normal text-muted-foreground px-1">Nombre de
                                                    contacto</h3>
                                                <Input
                                                    id="name"
                                                    placeholder="nombre"
                                                    value={orderNumber}
                                                    type="text"
                                                    autoCapitalize="none"
                                                    autoComplete="name"
                                                    autoCorrect="off"
                                                    onChange={(e) => setOrderNumber(e.target.value)}
                                                />
                                            </div>
                                            <div className={"w-full"}>
                                                <h3 className="text-sm font-normal text-muted-foreground px-1">Teléfono
                                                    de contacto</h3>
                                                <Input
                                                    id="name"
                                                    placeholder="nombre"
                                                    value={orderNumber}
                                                    type="text"
                                                    autoCapitalize="none"
                                                    autoComplete="name"
                                                    autoCorrect="off"
                                                    onChange={(e) => setOrderNumber(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className={"grid grid-cols-3 grid-flow-col  gap-3 pt-3"}>
                                            <div className={"w-full col-span-2"}>
                                                <h3 className="text-sm font-normal text-muted-foreground px-1">Dirección</h3>
                                                <Input
                                                    id="name"
                                                    placeholder="nombre"
                                                    value={orderNumber}
                                                    type="text"
                                                    autoCapitalize="none"
                                                    autoComplete="name"
                                                    autoCorrect="off"
                                                    onChange={(e) => setOrderNumber(e.target.value)}
                                                />
                                            </div>
                                            <div className={"w-full"}>
                                                <h3 className="text-sm font-normal text-muted-foreground px-1">Código
                                                    Postal</h3>
                                                <Input
                                                    id="name"
                                                    placeholder="nombre"
                                                    value={orderNumber}
                                                    type="text"
                                                    autoCapitalize="none"
                                                    autoComplete="name"
                                                    autoCorrect="off"
                                                    onChange={(e) => setOrderNumber(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className={"flex items-center gap-3 pt-3"}>
                                            <div className={"w-full"}>
                                                <h3 className="text-sm font-normal text-muted-foreground px-1">Ciudad</h3>
                                                <Input
                                                    id="name"
                                                    placeholder="nombre"
                                                    value={orderNumber}
                                                    type="text"
                                                    autoCapitalize="none"
                                                    autoComplete="name"
                                                    autoCorrect="off"
                                                    onChange={(e) => setOrderNumber(e.target.value)}
                                                />
                                            </div>
                                            <div className={"w-full"}>
                                                <h3 className="text-sm font-normal text-muted-foreground px-1">Provincia</h3>
                                                <Input
                                                    id="name"
                                                    placeholder="nombre"
                                                    value={orderNumber}
                                                    type="text"
                                                    autoCapitalize="none"
                                                    autoComplete="name"
                                                    autoCorrect="off"
                                                    onChange={(e) => setOrderNumber(e.target.value)}
                                                />
                                            </div>
                                            <div className={"w-full"}>
                                                <h3 className="text-sm font-normal text-muted-foreground px-1">País</h3>
                                                <Input
                                                    id="name"
                                                    placeholder="nombre"
                                                    value={orderNumber}
                                                    type="text"
                                                    autoCapitalize="none"
                                                    autoComplete="name"
                                                    autoCorrect="off"
                                                    onChange={(e) => setOrderNumber(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className={"w-full"}>
                                    <CardHeader>
                                        <CardTitle>Dirección de entrega</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className={"flex items-center gap-3"}>
                                            <Select
                                                value={status}
                                                onValueChange={(value) => {
                                                    setStatus(value)
                                                }}
                                            >
                                                <SelectTrigger className="w-full text-foreground">
                                                    <SelectValue/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {Object.keys(statusess).map((key) => (
                                                            <SelectItem key={key} value={key}>
                                                                {statusess[key]}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className={"flex items-center gap-3 pt-3"}>
                                            <div className={"w-full"}>
                                                <h3 className="text-sm font-normal text-muted-foreground px-1">Nombre de
                                                    contacto</h3>
                                                <Input
                                                    id="name"
                                                    placeholder="nombre"
                                                    value={orderNumber}
                                                    type="text"
                                                    autoCapitalize="none"
                                                    autoComplete="name"
                                                    autoCorrect="off"
                                                    onChange={(e) => setOrderNumber(e.target.value)}
                                                />
                                            </div>
                                            <div className={"w-full"}>
                                                <h3 className="text-sm font-normal text-muted-foreground px-1">Teléfono
                                                    de contacto</h3>
                                                <Input
                                                    id="name"
                                                    placeholder="nombre"
                                                    value={orderNumber}
                                                    type="text"
                                                    autoCapitalize="none"
                                                    autoComplete="name"
                                                    autoCorrect="off"
                                                    onChange={(e) => setOrderNumber(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className={"grid grid-cols-3 grid-flow-col  gap-3 pt-3"}>
                                            <div className={"w-full col-span-2"}>
                                                <h3 className="text-sm font-normal text-muted-foreground px-1">Dirección</h3>
                                                <Input
                                                    id="name"
                                                    placeholder="nombre"
                                                    value={orderNumber}
                                                    type="text"
                                                    autoCapitalize="none"
                                                    autoComplete="name"
                                                    autoCorrect="off"
                                                    onChange={(e) => setOrderNumber(e.target.value)}
                                                />
                                            </div>
                                            <div className={"w-full"}>
                                                <h3 className="text-sm font-normal text-muted-foreground px-1">Código
                                                    Postal</h3>
                                                <Input
                                                    id="name"
                                                    placeholder="nombre"
                                                    value={orderNumber}
                                                    type="text"
                                                    autoCapitalize="none"
                                                    autoComplete="name"
                                                    autoCorrect="off"
                                                    onChange={(e) => setOrderNumber(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className={"flex items-center gap-3 pt-3"}>
                                            <div className={"w-full"}>
                                                <h3 className="text-sm font-normal text-muted-foreground px-1">Ciudad</h3>
                                                <Input
                                                    id="name"
                                                    placeholder="nombre"
                                                    value={orderNumber}
                                                    type="text"
                                                    autoCapitalize="none"
                                                    autoComplete="name"
                                                    autoCorrect="off"
                                                    onChange={(e) => setOrderNumber(e.target.value)}
                                                />
                                            </div>
                                            <div className={"w-full"}>
                                                <h3 className="text-sm font-normal text-muted-foreground px-1">Provincia</h3>
                                                <Input
                                                    id="name"
                                                    placeholder="nombre"
                                                    value={orderNumber}
                                                    type="text"
                                                    autoCapitalize="none"
                                                    autoComplete="name"
                                                    autoCorrect="off"
                                                    onChange={(e) => setOrderNumber(e.target.value)}
                                                />
                                            </div>
                                            <div className={"w-full"}>
                                                <h3 className="text-sm font-normal text-muted-foreground px-1">País</h3>
                                                <Input
                                                    id="name"
                                                    placeholder="nombre"
                                                    value={orderNumber}
                                                    type="text"
                                                    autoCapitalize="none"
                                                    autoComplete="name"
                                                    autoCorrect="off"
                                                    onChange={(e) => setOrderNumber(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                            <div className={"w-full flex items-start gap-3 pt-3"}>
                                <Card className={"w-full"}>
                                    <CardHeader>
                                        <CardTitle>Paquetes</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {packages &&
                                            <DataTable type={"packages"} content={packages}/>
                                        }
                                    </CardContent>
                                </Card>
                            </div>
                            <div className={"w-full flex items-start gap-3 pt-3"}>
                                <Card className={"w-full"}>
                                    <CardHeader>
                                        <CardTitle>Notas</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className={"flex items-start gap-3"}>
                                            <div className={"w-full"}>
                                                <h3 className="text-sm font-normal text-muted-foreground">Notas de
                                                    entrega</h3>
                                                <Textarea placeholder="Type your message here." rows="4" cols="50" maxlength="200"/>
                                            </div>
                                            <div className={"w-full"}>
                                                <h3 className="text-sm font-normal text-muted-foreground">Notas
                                                    internas</h3>
                                                <Textarea placeholder="Type your message here." rows="4" cols="50" maxlength="200"/>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
