import React, {useEffect} from "react";

import {useParams} from "react-router-dom";
import api from "../../utils/Api";
import {Button} from "../../ui/button";
import {Separator} from "../../ui/separator";
import {Card, CardContent, CardHeader, CardTitle} from "../../ui/card";
import {Input} from "../../ui/input";
import {
    CalendarIcon,
    DownloadIcon,
    Loader2, CircleX
} from "lucide-react";
import {CustomSelect} from "../../components/ui/select/select";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "../../ui/select";
import {invoiceStatusess} from "../../components/table/data";
import {Popover, PopoverContent, PopoverTrigger} from "../../ui/popover";
import {cn} from "../../lib/utils";
import {format} from "date-fns";
import {es} from "date-fns/locale/es";
import {Calendar} from "../../ui/calendar";
import {DataTable} from "../../components/table/table";
import {toast} from "react-toastify";
import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs";


export default function Invoice() {
    const { invoiceId } = useParams();

    const [disabled, setDisabled] = React.useState<boolean>(false)

    const [invoiceNumber, setInvoiceNumber] = React.useState<string | undefined>(undefined)
    const [invoiceType, setInvoiceType] = React.useState<string | undefined>('INCOME')
    const [status, setStatus] = React.useState<string | undefined>(undefined)
    const [orders, setOrders] = React.useState<any | undefined>(undefined)
    const [order, setOrder] = React.useState<any | undefined>(undefined)
    const [emissionDate, setEmissionDate] = React.useState<Date>(undefined)
    const [dueDate, setDueDate] = React.useState<Date>(undefined)
    const [taxes, setTaxes] = React.useState<number | undefined>(undefined)

    const [customers, setCustomers] = React.useState<any | undefined>(undefined)
    const [customer, setCustomer] = React.useState<any | undefined>(undefined)
    const [providers, setProviders] = React.useState<any | undefined>(undefined)
    const [provider, setProvider] = React.useState<any | undefined>(undefined)
    const [invoices, setInvoices] = React.useState<any | undefined>(undefined)
    const [invoice, setInvoice] = React.useState<any | undefined>(undefined)

    const [directions, setDirections] = React.useState<any | undefined>(undefined)
    const [addressCity, setAddressCity] = React.useState<string | undefined>(undefined)
    const [addressContactName, setAddressContactName] = React.useState<string | undefined>(undefined)
    const [addressPhone, setAddressPhone] = React.useState<string | undefined>(undefined)
    const [addressProvince, setAddressProvince] = React.useState<string | undefined>(undefined)
    const [addressStreet, setAddressStreet] = React.useState<string | undefined>(undefined)
    const [addressPostalCode, setAddressPostalCode] = React.useState<string | undefined>(undefined)
    const [addressCountry, setAddressCountry] = React.useState<string | undefined>(undefined)

    const [items, setItems] = React.useState<any | undefined>([])


    const [ordersOpen, setOrdersopen] = React.useState(false)
    const [orderSearch, setOrderSearch] = React.useState<string | undefined>(undefined)
    const [customerSearch, setCustomerSearch] = React.useState<string | undefined>(undefined)
    const [providerSearch, setProviderSearch] = React.useState<string | undefined>(undefined)
    const [invoiceSearch, setInvoiceSearch] = React.useState<string | undefined>(undefined)

    const [getingInvoice, setGetingInvoice] = React.useState<boolean>(false)

    // GET INVOICE
    useEffect(() => {
        if(invoiceId === 'new') return;
        api.get('/invoices/' + invoiceId).then((res) => {
            setInvoiceType(res.invoiceType || null)
            setInvoiceNumber(res.invoiceNumber || null)
            setStatus(res.invoiceStatus || null)
            setOrder(res.order || null)
            setEmissionDate(res.emissionDate || null)
            setDueDate(res.dueDate || null)
            setTaxes(res.taxes * 100)
            setItems(res.items || [])

            setAddressCity(res.address.city || null)
            setAddressContactName(res.address.contactName || null)
            setAddressPhone(res.address.phone || null)
            setAddressProvince(res.address.province || null)
            setAddressStreet(res.address.street || null)
            setAddressPostalCode(res.address.postalCode || null)
            setAddressCountry(res.address.country || null)

            if(res.invoiceType === 'INCOME') {
                setCustomer(res.customer || null)
            }
            if(res.invoiceType === 'EXPENSE') {
                setProvider(res.provider || null)
            }

        }).catch((err) => {
            console.log(err)
        })
    }, []);


    // ORDER SEARCH
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            api.get(`/orders?page=1&size=5${orderSearch ? `&orderNumber=${orderSearch}` : ''}`).then((res) => { // hasInvoice=false
                setOrders(res.content)
            }).catch((err) => {
                console.log(err)
            })
        }, 500)

        return () => clearTimeout(delayDebounceFn)
    }, [orderSearch]);

    // CUSTOMER SEARCH
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            api.get(`/customers?page=1&size=5${customerSearch ? `&name=${customerSearch}` : ''}`).then((res) => {
                setCustomers(res.content)
            }).catch((err) => {
                console.log(err)
            })
        }, 500)

        return () => clearTimeout(delayDebounceFn)
    }, [customerSearch]);

    // PROVIDER SEARCH
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            api.get(`/providers?page=1&size=5${providerSearch ? `&name=${providerSearch}` : ''}`).then((res) => {
                setProviders(res.content)
            }).catch((err) => {
                console.log(err)
            })
        }, 500)

        return () => clearTimeout(delayDebounceFn)
    }, [providerSearch]);

    // INVOICE SEARCH
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            api.get(`/invoices?page=1&size=5${invoiceSearch ? `&invoiceNumber=${invoiceSearch}` : ''}`).then((res) => {
                setInvoices(res.content)
            }).catch((err) => {
                console.log(err)
            })
        }, 500)

        return () => clearTimeout(delayDebounceFn)
    }, [invoiceSearch]);

    // CUSTOMER ADDRESSES
    useEffect(() => {
        if(!customer) return
        api.get('/customers/' + customer.id ).then((res) => {
            if(!res || !res.addresses) return
            setDirections(res.addresses)
        }).catch((err) => {
            console.log(err)
        })
    }, [customer]);

    // PROVIDER ADDRESSES
    useEffect(() => {
        if(!provider) return
        api.get('/providers/' + provider.id ).then((res) => {
            if(!res || !res.addresses) return
            setDirections(res.addresses)
        }).catch((err) => {
            console.log(err)
        })
    }, [provider]);

    // PROVIDER ADDRESSES
    useEffect(() => {
        setDisabled((invoiceType === 'INCOME' || invoiceType === 'AMENDED_INCOME') && invoiceId !== 'new')
    }, [invoiceType,invoiceId]);

    function submitForm(event: React.SyntheticEvent) {
        event.preventDefault()

        const body = {
            invoiceStatus: status,
            invoiceType: invoiceType,
            emissionDate: emissionDate,
            dueDate: dueDate,
            customerId: customer?.id,
            providerId: provider?.id,
            address: {
                contactName: addressContactName,
                city: addressCity,
                phone: addressPhone,
                street: addressStreet,
                province: addressProvince,
                postalCode: addressPostalCode,
                country: addressCountry
            },
            taxes: taxes / 100,
            orderId: order?.id,
            items: items
        }

        if(invoiceId === 'new') {
            api.post('/invoices/' + (invoiceType === 'INCOME' || invoiceType === 'AMENDED_INCOME' ? 'final' : 'draft'), body).then((res) => {
                if(!!res) {
                    toast.success('Creado correctamente', {
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
        else {
            api.put('/invoices/' + invoiceId, body).then((res) => {
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
    }


    function setDates(direction:any) {
        setAddressCity(direction.city)
        setAddressContactName(direction.contactName)
        setAddressPhone(direction.phone)
        setAddressProvince(direction.province)
        setAddressStreet(direction.street)
        setAddressPostalCode(direction.postalCode)
        setAddressCountry(direction.country)
    }

    async function downloadInvoice(event: React.SyntheticEvent) {
        event.preventDefault()

        setGetingInvoice(true)
        api.get('/invoices/' + invoiceId + '/generate_pdf', 'arraybuffer').then((res) => {
            const blob = new Blob([res], { type: "application/pdf" });
            const pdfUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = pdfUrl;
            a.download = 'Factura_' + invoiceNumber + '.pdf';
            a.click();
            setGetingInvoice(false)
        }).catch((err) => {
            console.log(err)
            setGetingInvoice(false)
        })
    }

    return (
        <>
            <div className="hidden h-full flex-col md:flex">
                {invoiceId}
                <div
                    className="flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-30">
                    <div className="ml-auto flex flex-col w-full space-x-2 sm:justify-end">
                        <h2 className="text-3xl font-bold tracking-tight w-full ">{invoiceNumber || 'Nueva factura'}</h2>
                    </div>
                    <div className="ml-auto flex w-full space-x-2 sm:justify-end">
                        {disabled && (
                            <>
                                {!getingInvoice ? (
                                    <Button variant="outline" className={"w-[300px] justify-between"} onClick={downloadInvoice}>
                                        Descargar
                                        <DownloadIcon className="ml-2 h-4 w-4"/>
                                    </Button>
                                ) : (
                                    <Button disabled>
                                        <Loader2 className="animate-spin"/>
                                        Descargando...
                                    </Button>
                                )}
                            </>
                        )}
                        <Select
                            value={status}
                            onValueChange={(status) => {
                                setStatus(status)
                            }}
                        >
                            <SelectTrigger className="w-[300px] text-foreground">
                                <SelectValue/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {Object.keys(invoiceStatusess).map((key) => (
                                        <SelectItem key={key} value={key}>
                                            {invoiceStatusess[key]}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Button onClick={submitForm}>
                            {invoiceId === 'new' && 'Crear' ||'Guardar'}
                        </Button>
                    </div>
                </div>
                <Separator/>

                <Tabs defaultValue="INCOME" className="space-y-4 py-6" onValueChange={setInvoiceType}>
                    <TabsList>
                        <TabsTrigger value="INCOME" disabled={disabled}>Ingreso</TabsTrigger>
                        <TabsTrigger value="EXPENSE" disabled={invoiceId !== 'new'}>Gasto</TabsTrigger>
                        <TabsTrigger value="AMENDED_INCOME" disabled={disabled}>Ingresos rectificados</TabsTrigger>
                        <TabsTrigger value="AMENDED_EXPENSE" disabled={invoiceId !== 'new'}>Gastos rectificados</TabsTrigger>
                    </TabsList>
                </Tabs>


                <div className="h-full py-0">
                    <div className="md:order-1">
                        <div className={"w-full flex items-start gap-3"}>
                            <Card className={"w-full"}>
                                <CardHeader>
                                    <CardTitle>Información</CardTitle>
                                </CardHeader>
                                <CardContent>

                                    <div className={"grid grid-cols-2 grid-flow-col  gap-3 pt-3"}>

                                        {orders && (
                                            <div className={"w-full"}>
                                                <h3 className="text-sm font-normal text-muted-foreground">Orden</h3>

                                                <CustomSelect
                                                    type={"single"}
                                                    options={orders}
                                                    value={order}
                                                    modifier={setOrder}
                                                    identifier={'id'}
                                                    name={'orderNumber'}
                                                    searchValue={orderSearch}
                                                    searchValueModifier={setOrderSearch}
                                                    disabled={disabled}
                                                />
                                            </div>
                                        )}

                                        {(invoiceType === 'AMENDED_INCOME' || invoiceType === 'AMENDED_EXPENSE') && (
                                            <div className={"w-full"}>
                                                <h3 className="text-sm font-normal text-muted-foreground">Factura</h3>

                                                <CustomSelect
                                                    type={"single"}
                                                    options={invoices}
                                                    value={invoice}
                                                    modifier={setInvoice}
                                                    identifier={'id'}
                                                    name={'invoiceNumber'}
                                                    searchValue={invoiceSearch}
                                                    searchValueModifier={setInvoiceSearch}
                                                    disabled={disabled}
                                                />
                                            </div>
                                        )}

                                        {invoiceType === 'INCOME' && customers && (
                                            <div className={"w-full"}>
                                                <h3 className="text-sm font-normal text-muted-foreground">Cliente</h3>

                                                <CustomSelect
                                                    type={"single"}
                                                    options={customers}
                                                    value={customer}
                                                    modifier={setCustomer}
                                                    identifier={'id'}
                                                    name={'name'}
                                                    searchValue={customerSearch}
                                                    searchValueModifier={setCustomerSearch}
                                                    disabled={disabled}
                                                />
                                            </div>
                                        )}

                                        {invoiceType === 'EXPENSE' && providers && (
                                            <div className={"w-full"}>
                                                <h3 className="text-sm font-normal text-muted-foreground">Proveedor</h3>

                                                <CustomSelect
                                                    type={"single"}
                                                    options={providers}
                                                    value={provider}
                                                    modifier={setProvider}
                                                    identifier={'id'}
                                                    name={'name'}
                                                    searchValue={providerSearch}
                                                    searchValueModifier={setProviderSearch}
                                                    disabled={disabled}
                                                />
                                            </div>
                                        )}

                                    </div>

                                    <div className={"grid grid-cols-2 grid-flow-col  gap-3 pt-3"}>
                                        {/*<div clasName={"w-full"}>
                                            <h3 className="text-sm font-normal text-muted-foreground px-1">Fecha de
                                                Emisión</h3>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full justify-start text-left font-normal",
                                                            !emissionDate && "text-muted-foreground"
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4"/>
                                                        {emissionDate ? format(emissionDate, "PPP", {locale: es}) :
                                                            <span>Seleccionar fecha</span>}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                    <Calendar
                                                        locale={es}
                                                        mode="single"
                                                        selected={emissionDate}
                                                        onSelect={(date) => setEmissionDate(new Date(format(date, "yyyy-MM-dd")))}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>*/}
                                        <div className={"w-full"}>
                                            <h3 className="text-sm font-normal text-muted-foreground px-1">Fecha de Vencimiento</h3>
                                            <div className={"flex items-center gap-3"}>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full justify-start text-left font-normal",
                                                                !dueDate && "text-muted-foreground"
                                                            )}
                                                            disabled={disabled}
                                                        >
                                                            <CalendarIcon className="mr-2 h-4 w-4"/>
                                                            {dueDate ? format(dueDate, "PPP", {locale: es}) :
                                                                <span>Seleccionar fecha</span>}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0">
                                                        <Calendar
                                                            locale={es}
                                                            mode="single"
                                                            selected={dueDate}
                                                            onSelect={(date) => setDueDate(new Date(format(date, "yyyy-MM-dd")))}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                {dueDate && !disabled && (
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 p-0" onClick={() => setDueDate(undefined)} >
                                                        <CircleX />
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                        <div className={"w-full"}>
                                            <h3 className="text-sm font-normal text-muted-foreground px-1">Impuestos</h3>
                                            <Input
                                                id="taxes"
                                                placeholder="Impuestos"
                                                value={taxes}
                                                type="number"
                                                onChange={(e) => setTaxes(parseFloat(e.target.value))}
                                                disabled={disabled}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className={"w-full"}>
                                <CardHeader>
                                    <CardTitle>Dirección</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {directions && (
                                        <div className={"pt-3"}>
                                            <>
                                                <h3 className="text-sm font-normal text-muted-foreground">Dirección</h3>
                                                <div className={"flex items-center gap-3"}>
                                                    <Select
                                                        value={directions.find((item: any) =>
                                                            (item.street === addressStreet &&
                                                                item.postalCode === addressPostalCode &&
                                                                item.city === addressCity &&
                                                                item.province === addressProvince &&
                                                                item.country === addressCountry &&
                                                                item.name === addressContactName)
                                                        )}
                                                        onValueChange={(value) => {
                                                            setDates(value)
                                                        }}
                                                        disabled={disabled}
                                                    >
                                                        <SelectTrigger className="w-full text-foreground">
                                                            <span className="">
                                                                Dirección
                                                            </span>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectItem value={undefined} disabled>
                                                                    Direcciónes
                                                                </SelectItem>
                                                                {directions.map((item: any) => (
                                                                    <SelectItem key={item.id} value={item}>
                                                                        {item.street}, {item.postalCode}, {item.city}, {item.province}, {item.country} | {item.contactName}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </>
                                        </div>
                                    )}
                                    <div className={"pt-3"}>
                                        <div className={"flex items-center gap-3 pt-3"}>
                                            <div className={"w-full"}>
                                                <h3 className="text-sm font-normal text-muted-foreground px-1">Nombre de
                                                    contacto</h3>
                                                <Input
                                                    id="name"
                                                    placeholder="Nombre de contacto"
                                                    value={addressContactName}
                                                    type="text"
                                                    autoCapitalize="none"
                                                    autoComplete="name"
                                                    autoCorrect="off"
                                                    onChange={(e) => setAddressContactName(e.target.value)}
                                                    disabled={disabled}
                                                />
                                            </div>
                                            <div className={"w-full"}>
                                                <h3 className="text-sm font-normal text-muted-foreground px-1">Teléfono
                                                    de contacto</h3>
                                                <Input
                                                    id="name"
                                                    placeholder="Teléfono de contacto"
                                                    value={addressPhone}
                                                    type="text"
                                                    autoCapitalize="none"
                                                    autoComplete="name"
                                                    autoCorrect="off"
                                                    onChange={(e) => setAddressPhone(e.target.value)}
                                                    disabled={disabled}
                                                />
                                            </div>
                                        </div>
                                        <div className={"grid grid-cols-3 grid-flow-col  gap-3 pt-3"}>
                                            <div className={"w-full col-span-2"}>
                                                <h3 className="text-sm font-normal text-muted-foreground px-1">Dirección</h3>
                                                <Input
                                                    id="name"
                                                    placeholder="Dirección"
                                                    value={addressStreet}
                                                    type="text"
                                                    autoCapitalize="none"
                                                    autoComplete="name"
                                                    autoCorrect="off"
                                                    onChange={(e) => setAddressStreet(e.target.value)}
                                                    disabled={disabled}
                                                />
                                            </div>
                                            <div className={"w-full"}>
                                                <h3 className="text-sm font-normal text-muted-foreground px-1">Código
                                                    Postal</h3>
                                                <Input
                                                    id="name"
                                                    placeholder="Código Postal"
                                                    value={addressPostalCode}
                                                    type="text"
                                                    autoCapitalize="none"
                                                    autoComplete="name"
                                                    autoCorrect="off"
                                                    onChange={(e) => setAddressPostalCode(e.target.value)}
                                                    disabled={disabled}
                                                />
                                            </div>
                                        </div>
                                        <div className={"flex items-center gap-3 pt-3"}>
                                            <div className={"w-full"}>
                                                <h3 className="text-sm font-normal text-muted-foreground px-1">Ciudad</h3>
                                                <Input
                                                    id="name"
                                                    placeholder="Ciudad"
                                                    value={addressCity}
                                                    type="text"
                                                    autoCapitalize="none"
                                                    autoComplete="name"
                                                    autoCorrect="off"
                                                    onChange={(e) => setAddressCity(e.target.value)}
                                                    disabled={disabled}
                                                />
                                            </div>
                                            <div className={"w-full"}>
                                                <h3 className="text-sm font-normal text-muted-foreground px-1">Provincia</h3>
                                                <Input
                                                    id="name"
                                                    placeholder="Provincia"
                                                    value={addressProvince}
                                                    type="text"
                                                    autoCapitalize="none"
                                                    autoComplete="name"
                                                    autoCorrect="off"
                                                    onChange={(e) => setAddressProvince(e.target.value)}
                                                    disabled={disabled}
                                                />
                                            </div>
                                            <div className={"w-full"}>
                                                <h3 className="text-sm font-normal text-muted-foreground px-1">País</h3>
                                                <Input
                                                    id="name"
                                                    placeholder="País"
                                                    value={addressCountry}
                                                    type="text"
                                                    autoCapitalize="none"
                                                    autoComplete="name"
                                                    autoCorrect="off"
                                                    onChange={(e) => setAddressCountry(e.target.value)}
                                                    disabled={disabled}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                </CardContent>
                            </Card>
                        </div>
                        <div className={"w-full flex items-start gap-3 pt-3"}>
                            <Card className={"w-full"}>
                                <CardHeader>
                                    <CardTitle>Conceptos</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <DataTable type={"items"} content={items} edit={!disabled} id={invoiceId}  editHook={setItems} create={!disabled} remove={!disabled}/>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
