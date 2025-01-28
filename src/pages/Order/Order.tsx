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

    /******** Lateral 1 ********/
    //Customer
    const [customers, setCustomers] = React.useState<any | undefined>(undefined)
    const [customerAddresses, setCustomerAddresses] = React.useState<any | undefined>(undefined)
    const [customerId, setCustomerId] = React.useState<string | undefined>(undefined)
    const [customerNumber, setCustomerNumber] = React.useState<string | undefined>(undefined)
    const [customerName, setCustomerName] = React.useState<string | undefined>(undefined)
    const [customerNif, setCustomerNif] = React.useState<string | undefined>(undefined)
    const [customerEmail, setCustomerEmail] = React.useState<string | undefined>(undefined)
    const [customerIban, setCustomerIban] = React.useState<string | undefined>(undefined)
    const [customerCreationDate, setCustomeCreationDate] = React.useState<Date>(undefined)
    //Haulier
    const [hauliers, setHauliers] = React.useState<any | undefined>(undefined)
    const [haulierAddresses, setHaulierAddresses] = React.useState<any | undefined>(undefined)
    const [haulierId, setHaulierId] = React.useState<string | undefined>(undefined)
    const [haulierNumber, setHaulierNumber] = React.useState<string | undefined>(undefined)
    const [haulierCompanyName, setHaulierCompanyName] = React.useState<string | undefined>(undefined)
    const [haulierNif, setHaulierNif] = React.useState<string | undefined>(undefined)
    const [haulierIban, setHaulierIban] = React.useState<string | undefined>(undefined)
    const [haulierEmail, setHaulierEmail] = React.useState<string | undefined>(undefined)
    const [haulierAddress, setHaulierAddress] = React.useState<any | undefined>(undefined)
    const [haulierCreationDate, setHaulierCreationDate] = React.useState<Date>(undefined)

    /******** Lateral 2 ********/
    // Fechas
    const [estimatedDeliveryDate, setEstimatedDeliveryDate] = React.useState<Date>(undefined)
    const [deliveryDate, setDeliveryDate] = React.useState<Date>(undefined)

    /******** Central 1 ********/
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

    // Fetch data
    useEffect(() => {
        api.get('/orders/' + orderId).then((res) => {
            /******** TOP ********/
            setStatus(res.status)
            setOrderNumber(res.orderNumber)
            setSentDate(new Date(res.sentDate))

            /******** Lateral 1 ********/
            //Customer
            setCustomerId(res.customer.id)
            setCustomerNumber(res.customer.customerNumber)
            setCustomerName(res.customer.name)
            setCustomerNif(res.customer.nif)
            setCustomerEmail(res.customer.email)
            setCustomerIban(res.customer.iban)
            setCustomeCreationDate(new Date(res.customer.creationDate))
            //Haulier
            setHaulierId(res.haulier.id)
            setHaulierNumber(res.haulier.haulierNumber)
            setHaulierCompanyName(res.haulier.companyName)
            setHaulierNif(res.haulier.nif)
            setHaulierIban(res.haulier.iban)
            setHaulierEmail(res.haulier.email)
            setHaulierAddress(res.haulier.address)
            setHaulierCreationDate(new Date(res.haulier.creationDate))

            /******** Lateral 2 ********/
            // Fechas
            setEstimatedDeliveryDate(new Date(res.estimatedDeliveryDate))
            setDeliveryDate(new Date(res.deliveryDate))

            /******** Central 1 ********/
            // Direccion de recogida
            setSenderCity(res.sender.address.city)
            setSenderContactName(res.sender.address.contactName)
            setSenderPhone(res.sender.address.phone)
            setSenderProvince(res.sender.address.province)
            setSenderStreet(res.sender.address.street)
            setSenderPostalCode(res.sender.address.postalCode)
            setSenderCountry(res.sender.address.country)

            /******** Central 2 ********/
            // Direccion de entrega
            setReceiverCity(res.receiver.address.city)
            setReceiverContactName(res.receiver.address.contactName)
            setReceiverPhone(res.receiver.address.phone)
            setReceiverProvince(res.receiver.address.province)
            setReceiverStreet(res.receiver.address.street)
            setReceiverPostalCode(res.receiver.address.postalCode)
            setReceiverCountry(res.receiver.address.country)

            /******** Central 3 ********/
            // Paquetes
            setPackages(res.packages)

            /******** Central 4 ********/
            // Notas ( deliveryNotes, internalNotes)
            setDeliveryNotes(res.deliveryNotes)
            setPickupNotes(res.pickupNotes)
            setInternalNotes(res.internalNotes)
            setConditions(res.conditions)

            console.log(res)
        }).catch((err) => {
            /******** TOP ********/
            setStatus("CREATED")
            setOrderNumber("string")
            setSentDate(new Date("2025-01-28T18:29:58.886Z"))

            /******** Lateral 1 ********/
            //Customer
            setCustomerId("string")
            setCustomerNumber("string")
            setCustomerName("string")
            setCustomerNif("string")
            setCustomerEmail("string")
            setCustomerIban("string")
            setCustomeCreationDate(new Date("2025-01-28T18:29:58.886Z"))
            //Haulier
            setHaulierId("string")
            setHaulierNumber("string")
            setHaulierCompanyName("string")
            setHaulierNif("string")
            setHaulierIban("string")
            setHaulierEmail("string")
            setHaulierAddress( {
                city: "string",
                contactName: "string",
                phone: "string",
                province: "string",
                street: "string",
                postalCode: "string",
                country: "string"
            })
            setHaulierCreationDate(new Date("2025-01-28T18:29:58.886Z"))

            /******** Lateral 2 ********/
            // Fechas
            setEstimatedDeliveryDate(new Date("2025-01-28T18:29:58.886Z"))
            setDeliveryDate(new Date("2025-01-28T18:29:58.886Z"))

            /******** Central 1 ********/
            // Direccion de recogida
            setSenderCity("string")
            setSenderContactName("string")
            setSenderPhone("string")
            setSenderProvince("string")
            setSenderStreet("string")
            setSenderPostalCode("string")
            setSenderCountry("string")

            /******** Central 2 ********/
            // Direccion de entrega
            setReceiverCity("string")
            setReceiverContactName("string")
            setReceiverPhone("string")
            setReceiverProvince("string")
            setReceiverStreet("string")
            setReceiverPostalCode("string")
            setReceiverCountry("string")

            /******** Central 3 ********/
            // Paquetes
            setPackages( [
                {
                    "id": 0,
                    "description": "string",
                    "height": 0,
                    "width": 0,
                    "length": 0,
                    "weight": 0
                },
                {
                    "id": 1,
                    "description": "string",
                    "height": 0,
                    "width": 0,
                    "length": 0,
                    "weight": 0
                },
                {
                    "id": 2,
                    "description": "string",
                    "height": 0,
                    "width": 0,
                    "length": 0,
                    "weight": 0
                }
            ])

            /******** Central 4 ********/
            // Notas ( deliveryNotes, pickupNotes, internalNotes, conditions )
            setDeliveryNotes("string")
            setPickupNotes("string")
            setInternalNotes("string")
            setConditions("string")

        })
    }, []);

    // Fetch customers
    useEffect(() => {
        api.get('/customers').then((res) => {
            setCustomers(res.content)
        }).catch((err) => {
            setCustomers([
                {
                    "id": 0,
                    "customerNumber": "string",
                    "name": "string",
                    "nif": "string",
                    "email": "string",
                    "iban": "string",
                    "creationDate": "2025-01-28T19:13:39.361Z"
                },
                {
                    "id": 1,
                    "customerNumber": "string",
                    "name": "string",
                    "nif": "string",
                    "email": "string",
                    "iban": "string",
                    "creationDate": "2025-01-28T19:13:39.361Z"
                },
                {
                    "id": 2,
                    "customerNumber": "string",
                    "name": "string",
                    "nif": "string",
                    "email": "string",
                    "iban": "string",
                    "creationDate": "2025-01-28T19:13:39.361Z"
                },
                {
                    "id": 3,
                    "customerNumber": "string",
                    "name": "string",
                    "nif": "string",
                    "email": "string",
                    "iban": "string",
                    "creationDate": "2025-01-28T19:13:39.361Z"
                }
            ])
        })
    }, []);

    // Fetch customers
    useEffect(() => {
        api.get('/hauliers').then((res) => {
            setHauliers(res.content)
        }).catch((err) => {
            setHauliers([
                {
                    "id": 0,
                    "haulierNumber": "string",
                    "companyName": "string",
                    "nif": "string",
                    "iban": "string",
                    "email": "string",
                    "creationDate": "2025-01-28T19:15:12.861Z"
                },
                {
                    "id": 1,
                    "haulierNumber": "string",
                    "companyName": "string",
                    "nif": "string",
                    "iban": "string",
                    "email": "string",
                    "creationDate": "2025-01-28T19:15:12.861Z"
                },
                {
                    "id": 2,
                    "haulierNumber": "string",
                    "companyName": "string",
                    "nif": "string",
                    "iban": "string",
                    "email": "string",
                    "creationDate": "2025-01-28T19:15:12.861Z"
                },
                {
                    "id": 3,
                    "haulierNumber": "string",
                    "companyName": "string",
                    "nif": "string",
                    "iban": "string",
                    "email": "string",
                    "creationDate": "2025-01-28T19:15:12.861Z"
                }
            ])
        })
    }, []);

    // Fetch customer addresses
    useEffect(() => {
        api.get('/customers/' + customerId).then((res) => {
            setCustomerAddresses(res.addresses)
        }).catch((err) => {
            setCustomerAddresses([
                {
                    "id": 0,
                    "name": "string",
                    "city": "string",
                    "phone": "string",
                    "province": "string",
                    "street": "string",
                    "postalCode": "string",
                    "country": "string"
                },
                {
                    "id": 1,
                    "name": "string",
                    "city": "string",
                    "phone": "string",
                    "province": "string",
                    "street": "string",
                    "postalCode": "string",
                    "country": "string"
                },
                {
                    "id": 2,
                    "name": "string",
                    "city": "string",
                    "phone": "string",
                    "province": "string",
                    "street": "string",
                    "postalCode": "string",
                    "country": "string"
                }
            ])
        })
    }, [customerId]);

    // Fetch haulier addresses
    useEffect(() => {
        api.get('/hauliers/' + customerId).then((res) => {
            setHaulierAddresses(res.addresses)
        }).catch((err) => {
            setHaulierAddresses( {
                "city": "string",
                "contactName": "string",
                "phone": "string",
                "province": "string",
                "street": "string",
                "postalCode": "string",
                "country": "string"
            })
        })
    }, [haulierId]);

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
                                    {customers && (
                                        <>
                                            <h3 className="text-sm font-normal text-muted-foreground">Cliente</h3>
                                            <div className={"flex items-center gap-3 "}>
                                                <Select
                                                    value={customers.find((customer:any) => customer.id === customerId).id}
                                                    onValueChange={(value) => {
                                                        setStatus(value)
                                                    }}
                                                >
                                                    <SelectTrigger className="w-[300px] text-foreground">
                                                        <SelectValue/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            {customers.map((customer:any) => (
                                                                <SelectItem key={customer.id} value={customer.id}>
                                                                    {customer.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </>
                                    )}
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
                                                    value={senderContactName}
                                                    type="text"
                                                    autoCapitalize="none"
                                                    autoComplete="name"
                                                    autoCorrect="off"
                                                    onChange={(e) => setSenderContactName(e.target.value)}
                                                />
                                            </div>
                                            <div className={"w-full"}>
                                                <h3 className="text-sm font-normal text-muted-foreground px-1">Teléfono
                                                    de contacto</h3>
                                                <Input
                                                    id="name"
                                                    placeholder="nombre"
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
                                                    placeholder="nombre"
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
                                                    placeholder="nombre"
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
                                                    placeholder="nombre"
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
                                                    placeholder="nombre"
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
                                                    placeholder="nombre"
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
                                                <h3 className="text-sm font-normal text-muted-foreground">Notas de entrega</h3>
                                                <Textarea placeholder="Type your message here." rows="4" cols="50" maxlength="200"/>
                                            </div>
                                            <div className={"w-full"}>
                                                <h3 className="text-sm font-normal text-muted-foreground">Notas de recogida</h3>
                                                <Textarea placeholder="Type your message here." rows="4" cols="50" maxlength="200"/>
                                            </div>
                                        </div>
                                        <div className={"flex items-start gap-3"}>
                                            <div className={"w-full"}>
                                                <h3 className="text-sm font-normal text-muted-foreground">Notas internas</h3>
                                                <Textarea placeholder="Type your message here." rows="4" cols="50" maxlength="200"/>
                                            </div>
                                            <div className={"w-full"}>
                                                <h3 className="text-sm font-normal text-muted-foreground">Condiciónes</h3>
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
