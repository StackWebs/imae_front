import React, {useEffect} from "react";

import {Link, useNavigate, useParams} from "react-router-dom";
import api from "../../utils/Api";
import {Button} from "../../ui/button";
import {Separator} from "../../ui/separator";
import {Card, CardContent, CardHeader, CardTitle} from "../../ui/card";
import {Input} from "../../ui/input";
import {DataTable} from "../../components/table/table";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup} from "../../ui/select";
import {orderStatusess} from "../../components/table/data";
import { Calendar } from "../../ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../ui/popover"
import {cn} from "../../lib/utils";
import {CalendarIcon, DownloadIcon, Loader2, Link2, CircleX, Pencil} from "lucide-react";
import { format } from "date-fns"
import {es} from "date-fns/locale/es";
import {Textarea} from "../../ui/textarea";
import {toast} from "react-toastify";

export default function Order() {
    const { orderId } = useParams();
    const navigate = useNavigate();

    const [creationDate, setCreationDate] = React.useState<string | undefined>(undefined)

    // TOP
    const [status, setStatus] = React.useState<string | undefined>(undefined)
    const [orderNumber, setOrderNumber] = React.useState<string | undefined>(undefined)
    const [sentDate, setSentDate] = React.useState<Date>(undefined)
    const [customerReference , setCustomerReference] = React.useState<string | undefined>(undefined)
    const [projectNumber, setProjectNumber] = React.useState<any | undefined>(undefined)

    /******** Lateral 1 ********/
    //Customer
    const [customers, setCustomers] = React.useState<any | undefined>(undefined)
    const [customer, setCustomer] = React.useState<any | undefined>(undefined)
    //Haulier
    const [hauliers, setHauliers] = React.useState<any | undefined>(undefined)
    const [haulier, setHaulier] = React.useState<any | undefined>(undefined)

    const [invoice, setInvoice] = React.useState<any | undefined>(undefined)

    /******** Lateral 2 ********/
    // Fechas
    const [estimatedDeliveryDate, setEstimatedDeliveryDate] = React.useState<Date>(undefined)
    const [deliveryDate, setDeliveryDate] = React.useState<Date>(undefined)

    /******** Central 1 ********/
    // Direcciones
    const [directions, setDirections] = React.useState<any | undefined>(undefined)

    // Direccion de recogida
    const [senderCity, setSenderCity] = React.useState<string | undefined>(undefined)
    const [senderContactName, setSenderContactName] = React.useState<string | undefined>(undefined)
    const [senderPhone, setSenderPhone] = React.useState<string | undefined>(undefined)
    const [senderProvince, setSenderProvince] = React.useState<string | undefined>(undefined)
    const [senderStreet, setSenderStreet] = React.useState<string | undefined>(undefined)
    const [senderPostalCode, setSenderPostalCode] = React.useState<string | undefined>(undefined)
    const [senderCountry, setSenderCountry] = React.useState<string | undefined>(undefined)

    /******** Central 2 ********/
    // Direccion de entrega
    const [receiverCity, setReceiverCity] = React.useState<string | undefined>(undefined)
    const [receiverContactName, setReceiverContactName] = React.useState<string | undefined>(undefined)
    const [receiverPhone, setReceiverPhone] = React.useState<string | undefined>(undefined)
    const [receiverProvince, setReceiverProvince] = React.useState<string | undefined>(undefined)
    const [receiverStreet, setReceiverStreet] = React.useState<string | undefined>(undefined)
    const [receiverPostalCode, setReceiverPostalCode] = React.useState<string | undefined>(undefined)
    const [receiverCountry, setReceiverCountry] = React.useState<string | undefined>(undefined)


    /******** Central 3 ********/
    // Paquetes
    const [packages, setPackages] = React.useState<any | undefined>(undefined)

    /******** Central 4 ********/
    // Notas ( deliveryNotes, pickupNotes, internalNotes, conditions )
    const [deliveryNotes, setDeliveryNotes] = React.useState<string | undefined>(undefined)
    const [pickupNotes, setPickupNotes] = React.useState<string | undefined>(undefined)
    const [internalNotes, setInternalNotes] = React.useState<string | undefined>(undefined)
    const [conditions, setConditions] = React.useState<string | undefined>(undefined)

    const [getingAlbran, setGetingAlbran] = React.useState<boolean>(false)

    // Fetch data
    useEffect(() => {
        api.get('/orders/' + orderId).then((res) => {
            setCreationDate(res.creationDate || null)


            /******** TOP ********/
            setStatus(res.orderStatus || null)
            setOrderNumber(res.orderNumber || null)
            setSentDate(res.sentDate ? new Date(res.sentDate) : null)
            setCustomerReference(res.customerReference || null)
            setProjectNumber(res.project?.projectNumber || null)

            /******** Lateral 1 ********/
            //Customer
            setCustomer(res.customer || null)
            //Haulier
            setHaulier(res.haulier || null)
            setInvoice(res.invoice || null)

            /******** Lateral 2 ********/
            // Fechas
            setEstimatedDeliveryDate(res.estimatedDeliveryDate ? new Date(res.estimatedDeliveryDate) : null)
            setDeliveryDate(res.deliveryDate ? new Date(res.deliveryDate) : null)

            /******** Central 1 ********/
            // Direccion de recogida
            setSenderCity(res.sender?.city || null)
            setSenderContactName(res.sender?.contactName || null)
            setSenderPhone(res.sender?.phone || null)
            setSenderProvince(res.sender?.province || null)
            setSenderStreet(res.sender?.street || null)
            setSenderPostalCode(res.sender?.postalCode || null)
            setSenderCountry(res.sender?.country || null)

            /******** Central 2 ********/
            // Direccion de entrega
            setReceiverCity(res.receiver?.city || null)
            setReceiverContactName(res.receiver?.contactName || null)
            setReceiverPhone(res.receiver?.phone || null)
            setReceiverProvince(res.receiver?.province || null)
            setReceiverStreet(res.receiver?.street || null)
            setReceiverPostalCode(res.receiver?.postalCode || null)
            setReceiverCountry(res.receiver?.country || null)

            /******** Central 3 ********/
            // Paquetes
            setPackages(res.packages || null)

            /******** Central 4 ********/
            // Notas ( deliveryNotes, internalNotes)
            setDeliveryNotes(res.deliveryNotes || null)
            setPickupNotes(res.pickupNotes || null)
            setInternalNotes(res.internalNotes || null)
            setConditions(res.conditions || null)

            console.log(res)
        }).catch((err) => {})
    }, []);

    // Fetch customers && hauliers
    useEffect(() => {
        api.get('/customers?page=1&size=999').then((res) => {
            setCustomers(res.content)
        }).catch((err) => {

        })
        api.get('/hauliers?page=1&size=999').then((res) => {
            setHauliers(res.content)
        }).catch((err) => {

        })
    }, []);

    useEffect(() => {
        if(!customer) return
        api.get('/customers/' + customer.id ).then((res) => {
            if(!res || !res.addresses) return
            setDirections(res.addresses)
        }).catch((err) => {
        })
    }, [customer]);

    function setDates(direction:any, type:string) {
        console.log(direction)
        switch(type) {
            case 'sender':
                setSenderCity(direction.city || '')
                setSenderContactName(direction.contactName || '')
                setSenderPhone(direction.phone || '')
                setSenderProvince(direction.province || '')
                setSenderStreet(direction.street || '')
                setSenderPostalCode(direction.postalCode || '')
                setSenderCountry(direction.country || '')
                break;
            case 'receiver':
                setReceiverCity(direction.city || '')
                setReceiverContactName(direction.contactName || '')
                setReceiverPhone(direction.phone || '')
                setReceiverProvince(direction.province || '')
                setReceiverStreet(direction.street || '')
                setReceiverPostalCode(direction.postalCode || '')
                setReceiverCountry(direction.country || '')
                break;
        }
    }

    function submitForm(event: React.SyntheticEvent) {
        event.preventDefault()

        var body = {
            "creationDate": creationDate || null,
            "orderStatus": status || null,
            "sentDate": sentDate || null,
            "estimatedDeliveryDate": estimatedDeliveryDate || null,
            "deliveryDate": deliveryDate || null,
            "sender": {
                "contactName": senderContactName || null,
                "city": senderCity || null,
                "phone": senderPhone || null,
                "street": senderStreet || null,
                "province": senderProvince || null,
                "postalCode": senderPostalCode || null,
                "country": senderCountry || null
            },
            "receiver": {
                "contactName": receiverContactName || null,
                "city": receiverCity || null,
                "phone": receiverPhone || null,
                "street": receiverStreet || null,
                "province": receiverProvince || null,
                "postalCode": receiverPostalCode || null,
                "country": receiverCountry || null
            },
            "haulierId": haulier?.id || null,
            "customerId": customer?.id || null,
            //"deliveryNoteId": 0,
            "customerReference": customerReference || null,
            "deliveryNotes": deliveryNotes || null,
            "pickupNotes": pickupNotes || null,
            "internalNotes": internalNotes || null,
            "conditions": conditions || null,
        }

        api.put('/orders/' + orderId, body).then((res) => {
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

    function downloadAlbaran(event: React.SyntheticEvent) {
        event.preventDefault()

        setGetingAlbran(true)

        api.post('/orders/' + orderId + '/delivery_note',{}).then((res) => {
            if(!res.id) return;
            api.get('/delivery_notes/' + res.id + '/generate_pdf', 'arraybuffer').then((doc) => {
                const blob = new Blob([doc], { type: "application/pdf" });
                const pdfUrl = URL.createObjectURL(blob);

                const link = document.createElement("a");
                link.href = pdfUrl;
                link.download = "Albarán_" + res.deliveryNoteNumber + ".pdf";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                //window.open(pdfUrl, "_blank");
                setGetingAlbran(false)
            }).catch((err) => {
                console.log(err)
                setGetingAlbran(false)
            })
        }).catch((err) => {
            console.log(err)
            setGetingAlbran(false)
        })
    }

    return (
        <>
            <div className="hidden h-full flex-col md:flex">
                <div
                    className="flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-30">
                    <div className="ml-auto flex flex-col w-full space-x-2 sm:justify-end">
                        <h2 className="text-3xl font-bold tracking-tight w-full ">{orderNumber}</h2>
                        <p className="text-muted-foreground">{projectNumber}</p>
                    </div>
                    <div className="ml-auto flex w-full space-x-2 sm:justify-end">
                        {!getingAlbran ? (
                            <Button variant="outline" className={"w-[300px] justify-between"} onClick={downloadAlbaran}>
                                Albaran
                                <DownloadIcon className="ml-2 h-4 w-4"/>
                            </Button>
                        ) : (
                            <Button disabled>
                                <Loader2 className="animate-spin"/>
                                Descargando...
                            </Button>
                        )}
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
                                    {Object.keys(orderStatusess).map((key) => (
                                        <SelectItem key={key} value={key}>
                                            {orderStatusess[key]}
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
                                    <CardTitle>Detalles</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {customers && (
                                        <>
                                            <h3 className="text-sm font-normal text-muted-foreground">Cliente</h3>
                                            <div className={"flex items-center gap-3 "}>
                                                <Select
                                                    value={customers.find((item:any) => item.id === customer?.id)}
                                                    onValueChange={(value) => {
                                                        setCustomer(value)
                                                    }}
                                                >
                                                    <SelectTrigger className="w-[300px] text-foreground">
                                                        {customer ? (
                                                            <SelectValue/>
                                                        ) : (
                                                            <span className=""></span>
                                                        )}
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value={undefined}>
                                                            Ninguno
                                                        </SelectItem>
                                                        <SelectGroup>
                                                            {customers.map((item:any) => (
                                                                <SelectItem key={item.id} value={item}>
                                                                    {item.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </>
                                    )}
                                    {hauliers && (
                                        <>
                                            <h3 className="text-sm font-normal text-muted-foreground pt-3">Transportista</h3>
                                            <div className={"flex items-center gap-3"}>
                                                <Select
                                                    value={hauliers.find((item:any) => item.id === haulier?.id )}
                                                    onValueChange={(value) => {
                                                        setHaulier(value)
                                                    }}
                                                >
                                                    <SelectTrigger className="w-[300px] text-foreground">
                                                        <SelectValue/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value={undefined}>
                                                            Ninguno
                                                        </SelectItem>
                                                        <SelectGroup>
                                                            {hauliers.map((item:any) => (
                                                                <SelectItem key={item.id} value={item}>
                                                                    {item.companyName}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </>
                                    )}
                                    <>
                                        <h3 className="text-sm font-normal text-muted-foreground pt-3">Referencia Cliente</h3>
                                        <div className={"flex items-center gap-3"}>
                                            <Input
                                                id="customerReference"
                                                placeholder="Referencia Cliente"
                                                value={customerReference}
                                                type="text"
                                                autoCapitalize="none"
                                                autoComplete="name"
                                                autoCorrect="off"
                                                onChange={(e) => setCustomerReference(e.target.value)}
                                            />
                                        </div>
                                    </>


                                    <h3 className="text-sm font-normal text-muted-foreground pt-3">Factura</h3>
                                    <div className={"flex items-center gap-3"}>
                                        {invoice ? (
                                            <Button variant="outline" className={"w-[300px] justify-between"} onClick={() => { navigate('/invoice/' + invoice.id)}}>
                                                {invoice.invoiceNumber}
                                                <Link2  className="ml-2 h-4 w-4"/>
                                            </Button>
                                        ) : (
                                            <Button variant="outline" className={"w-[300px] justify-between"} disabled>
                                                Sin factura
                                            </Button>
                                        )}
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
                                                    locale={es}
                                                    mode="single"
                                                    selected={sentDate}
                                                    onSelect={(date) => setSentDate(new Date(format(date, "yyyy-MM-dd")))}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        {sentDate && (
                                            <Button variant="ghost" size="icon" className="h-8 w-8 p-0" onClick={() => setSentDate(undefined)} >
                                                <CircleX />
                                            </Button>
                                        )}
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
                                                    locale={es}
                                                    mode="single"
                                                    selected={estimatedDeliveryDate}
                                                    onSelect={(date) => setEstimatedDeliveryDate(new Date(format(date, "yyyy-MM-dd")))}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        {estimatedDeliveryDate && (
                                            <Button variant="ghost" size="icon" className="h-8 w-8 p-0" onClick={() => setEstimatedDeliveryDate(undefined)} >
                                                <CircleX />
                                            </Button>
                                        )}
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
                                                    locale={es}
                                                    mode="single"
                                                    selected={deliveryDate}
                                                    onSelect={(date) => setDeliveryDate(new Date(format(date, "yyyy-MM-dd")))}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        {deliveryDate && (
                                            <Button variant="ghost" size="icon" className="h-8 w-8 p-0" onClick={() => setDeliveryDate(undefined)} >
                                                <CircleX />
                                            </Button>
                                        )}
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
                                        {directions && (
                                            <div className={"flex items-center gap-3"}>
                                                <Select
                                                    value={directions.find((item:any) =>
                                                        (item.street === senderStreet &&
                                                        item.postalCode === senderPostalCode &&
                                                        item.city === senderCity &&
                                                        item.province === senderProvince &&
                                                        item.country === senderCountry &&
                                                        item.contactName === senderContactName)
                                                    )}
                                                    onValueChange={(value) => {
                                                        setDates(value,'sender')
                                                    }}
                                                >
                                                    <SelectTrigger className="w-full text-foreground">
                                                        <span className="">
                                                            Direcciónes del cliente
                                                        </span>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            {directions.map((item:any) => (
                                                                <SelectItem key={item.id} value={item}>
                                                                    {item.street}, {item.postalCode}, {item.city}, {item.province}, {item.country} | {item.contactName}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        )}
                                        <div className={"flex items-center gap-3 pt-3"}>
                                            <div className={"w-full"}>
                                                <h3 className="text-sm font-normal text-muted-foreground px-1">Remitente</h3>
                                                <Input
                                                    id="name"
                                                    placeholder="Nombre de contacto"
                                                    value={senderContactName}
                                                    type="text"
                                                    autoCapitalize="none"
                                                    autoComplete="name"
                                                    autoCorrect="off"
                                                    onChange={(e) => setSenderContactName(e.target.value)}
                                                />
                                            </div>
                                            <div className={"w-full"}>
                                                <h3 className="text-sm font-normal text-muted-foreground px-1">Teléfono</h3>
                                                <Input
                                                    id="name"
                                                    placeholder="Teléfono"
                                                    value={senderPhone}
                                                    type="text"
                                                    autoCapitalize="none"
                                                    autoComplete="name"
                                                    autoCorrect="off"
                                                    onChange={(e) => setSenderPhone(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className={"grid grid-cols-3 grid-flow-col  gap-3 pt-3"}>
                                            <div className={"w-full col-span-2"}>
                                                <h3 className="text-sm font-normal text-muted-foreground px-1">Dirección</h3>
                                                <Input
                                                    id="name"
                                                    placeholder="Dirección"
                                                    value={senderStreet}
                                                    type="text"
                                                    autoCapitalize="none"
                                                    autoComplete="name"
                                                    autoCorrect="off"
                                                    onChange={(e) => setSenderStreet(e.target.value)}
                                                />
                                            </div>
                                            <div className={"w-full"}>
                                                <h3 className="text-sm font-normal text-muted-foreground px-1">Código Postal</h3>
                                                <Input
                                                    id="name"
                                                    placeholder="Código Postal"
                                                    value={senderPostalCode}
                                                    type="text"
                                                    autoCapitalize="none"
                                                    autoComplete="name"
                                                    autoCorrect="off"
                                                    onChange={(e) => setSenderPostalCode(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className={"flex items-center gap-3 pt-3"}>
                                            <div className={"w-full"}>
                                                <h3 className="text-sm font-normal text-muted-foreground px-1">Ciudad</h3>
                                                <Input
                                                    id="name"
                                                    placeholder="Ciudad"
                                                    value={senderCity}
                                                    type="text"
                                                    autoCapitalize="none"
                                                    autoComplete="name"
                                                    autoCorrect="off"
                                                    onChange={(e) => setSenderCity(e.target.value)}
                                                />
                                            </div>
                                            <div className={"w-full"}>
                                                <h3 className="text-sm font-normal text-muted-foreground px-1">Provincia</h3>
                                                <Input
                                                    id="name"
                                                    placeholder="Provincia"
                                                    value={senderProvince}
                                                    type="text"
                                                    autoCapitalize="none"
                                                    autoComplete="name"
                                                    autoCorrect="off"
                                                    onChange={(e) => setSenderProvince(e.target.value)}
                                                />
                                            </div>
                                            <div className={"w-full"}>
                                                <h3 className="text-sm font-normal text-muted-foreground px-1">País</h3>
                                                <Input
                                                    id="name"
                                                    placeholder="País"
                                                    value={senderCountry}
                                                    type="text"
                                                    autoCapitalize="none"
                                                    autoComplete="name"
                                                    autoCorrect="off"
                                                    onChange={(e) => setSenderCountry(e.target.value)}
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
                                        {directions && (
                                            <div className={"flex items-center gap-3"}>
                                                <Select
                                                    value={directions.find((item:any) =>
                                                        (item.street === receiverCity &&
                                                        item.postalCode === receiverContactName &&
                                                        item.city === receiverPhone &&
                                                        item.province === receiverProvince &&
                                                        item.country === receiverStreet &&
                                                        item.name === receiverPostalCode)
                                                    )}
                                                    onValueChange={(value) => {
                                                        setDates(value,'receiver')
                                                    }}
                                                >
                                                    <SelectTrigger className="w-full text-foreground">
                                                        <span className="">
                                                            Direcciónes del cliente
                                                        </span>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value={undefined} disabled>
                                                                Direcciónes del cliente
                                                            </SelectItem>
                                                            {directions.map((item:any) => (
                                                                <SelectItem key={item.id} value={item}>
                                                                    {item.street}, {item.postalCode}, {item.city}, {item.province}, {item.country} | {item.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        )}
                                        <div className={"flex items-center gap-3 pt-3"}>
                                            <div className={"w-full"}>
                                                <h3 className="text-sm font-normal text-muted-foreground px-1">Destinatario</h3>
                                                <Input
                                                    id="name"
                                                    placeholder="Nombre de contacto"
                                                    value={receiverContactName}
                                                    type="text"
                                                    autoCapitalize="none"
                                                    autoComplete="name"
                                                    autoCorrect="off"
                                                    onChange={(e) => setReceiverContactName(e.target.value)}
                                                />
                                            </div>
                                            <div className={"w-full"}>
                                                <h3 className="text-sm font-normal text-muted-foreground px-1">Teléfono</h3>
                                                <Input
                                                    id="name"
                                                    placeholder="Teléfono"
                                                    value={receiverPhone}
                                                    type="text"
                                                    autoCapitalize="none"
                                                    autoComplete="name"
                                                    autoCorrect="off"
                                                    onChange={(e) => setReceiverPhone(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className={"grid grid-cols-3 grid-flow-col  gap-3 pt-3"}>
                                            <div className={"w-full col-span-2"}>
                                                <h3 className="text-sm font-normal text-muted-foreground px-1">Dirección</h3>
                                                <Input
                                                    id="name"
                                                    placeholder="Dirección"
                                                    value={receiverStreet}
                                                    type="text"
                                                    autoCapitalize="none"
                                                    autoComplete="name"
                                                    autoCorrect="off"
                                                    onChange={(e) => setReceiverStreet(e.target.value)}
                                                />
                                            </div>
                                            <div className={"w-full"}>
                                                <h3 className="text-sm font-normal text-muted-foreground px-1">Código Postal</h3>
                                                <Input
                                                    id="name"
                                                    placeholder="Código Postal"
                                                    value={receiverPostalCode}
                                                    type="text"
                                                    autoCapitalize="none"
                                                    autoComplete="name"
                                                    autoCorrect="off"
                                                    onChange={(e) => setReceiverPostalCode(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className={"flex items-center gap-3 pt-3"}>
                                            <div className={"w-full"}>
                                                <h3 className="text-sm font-normal text-muted-foreground px-1">Ciudad</h3>
                                                <Input
                                                    id="name"
                                                    placeholder="Ciudad"
                                                    value={receiverCity}
                                                    type="text"
                                                    autoCapitalize="none"
                                                    autoComplete="name"
                                                    autoCorrect="off"
                                                    onChange={(e) => setReceiverCity(e.target.value)}
                                                />
                                            </div>
                                            <div className={"w-full"}>
                                                <h3 className="text-sm font-normal text-muted-foreground px-1">Provincia</h3>
                                                <Input
                                                    id="name"
                                                    placeholder="Provincia"
                                                    value={receiverProvince}
                                                    type="text"
                                                    autoCapitalize="none"
                                                    autoComplete="name"
                                                    autoCorrect="off"
                                                    onChange={(e) => setReceiverProvince(e.target.value)}
                                                />
                                            </div>
                                            <div className={"w-full"}>
                                                <h3 className="text-sm font-normal text-muted-foreground px-1">País</h3>
                                                <Input
                                                    id="name"
                                                    placeholder="País"
                                                    value={receiverCountry}
                                                    type="text"
                                                    autoCapitalize="none"
                                                    autoComplete="name"
                                                    autoCorrect="off"
                                                    onChange={(e) => setReceiverCountry(e.target.value)}
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
                                        <DataTable type={"packages"} content={packages} edit={true} id={orderId}/>
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
                                                <h3 className="text-sm font-normal text-muted-foreground">Notas de entrega</h3>
                                                <Textarea
                                                    value={deliveryNotes}
                                                    placeholder="Notas de entrega"
                                                    onChange={(e) => setDeliveryNotes(e.target.value)}
                                                    rows={4} cols={50} maxLength={200}
                                                />
                                            </div>
                                            <div className={"w-full"}>
                                                <h3 className="text-sm font-normal text-muted-foreground">Notas de recogida</h3>
                                                <Textarea
                                                    value={pickupNotes}
                                                    placeholder="Notas de recogida"
                                                    onChange={(e) => setPickupNotes(e.target.value)}
                                                    rows={4} cols={50} maxLength={200}
                                                />
                                            </div>
                                        </div>
                                        <div className={"flex items-start gap-3"}>
                                            <div className={"w-full"}>
                                                <h3 className="text-sm font-normal text-muted-foreground">Notas internas</h3>
                                                <Textarea
                                                    value={internalNotes}
                                                    placeholder="Notas internas"
                                                    onChange={(e) => setInternalNotes(e.target.value)}
                                                    rows={4} cols={50} maxLength={200}
                                                />
                                            </div>
                                            <div className={"w-full"}>
                                                <h3 className="text-sm font-normal text-muted-foreground">Condiciones</h3>
                                                <Textarea
                                                    value={conditions}
                                                    placeholder="Condiciones"
                                                    onChange={(e) => setConditions(e.target.value)}
                                                    rows={4} cols={50} maxLength={200}
                                                />
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
