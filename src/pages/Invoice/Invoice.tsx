import React, {useEffect} from "react";

import {useNavigate, useParams} from "react-router-dom";
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
    const [id, setId] = React.useState<string | undefined>(invoiceId)

    const [disabled, setDisabled] = React.useState<boolean>(false)

    const [invoiceNumber, setInvoiceNumber] = React.useState<string | undefined>(undefined)
    const [invoiceType, setInvoiceType] = React.useState<string | undefined>('INCOME')
    const [status, setStatus] = React.useState<string | undefined>('PENDING')
    const [orders, setOrders] = React.useState<any | undefined>(undefined)
    const [order, setOrder] = React.useState<any | undefined>(undefined)
    const [emissionDate, setEmissionDate] = React.useState<Date>(undefined)
    const [dueDate, setDueDate] = React.useState<Date>(undefined)
    const [taxes, setTaxes] = React.useState<number | undefined>(undefined)
    const [amendmentReason, setAmendmentReason] = React.useState<string | undefined>(null)
    const [providerInvoiceRef, setProviderInvoiceRef] = React.useState<string | undefined>(null)

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

    function setData(res:any) {
        setInvoiceType(res.invoiceType || null)
        setInvoiceNumber(res.invoiceNumber || null)
        setStatus(res.invoiceStatus || null)
        setOrder(res.orders ? res.orders[0] : null)
        setEmissionDate(res.emissionDate || null)
        setDueDate(res.dueDate || null)
        setTaxes(res.taxes * 100)
        setItems(res.items || [])
        setInvoice(res.amendedInvoice || null)
        setAmendmentReason(res.amendmentReason || null)
        setProviderInvoiceRef(res.providerInvoiceRef || null)

        setAddressCity(res.address.city || null)
        setAddressContactName(res.address.contactName || null)
        setAddressPhone(res.address.phone || null)
        setAddressProvince(res.address.province || null)
        setAddressStreet(res.address.street || null)
        setAddressPostalCode(res.address.postalCode || null)
        setAddressCountry(res.address.country || null)

        if(res.invoiceType === 'INCOME' || res.invoiceType === 'AMENDED_INCOME') {
            setCustomer(res.customer || null)
        }
        if(res.invoiceType === 'EXPENSE' || res.invoiceType === 'AMENDED_EXPENSE') {
            setProvider(res.provider || null)
        }
    }

    // GET INVOICE
    useEffect(() => {
        if(id === 'new') return;
        api.get('/invoices/' + id).then((res) => {
            setData(res)
        }).catch((err) => {
            console.log(err)
        })
    }, []);


    // ORDER SEARCH
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            api.get(`/orders?page=1&size=5${orderSearch ? `&orderNumber=${orderSearch}` : ''}${invoiceType === 'INCOME' ? '&hasInvoice=false' : ''}`).then((res) => {
                setOrders(res.content)
            }).catch((err) => {
                console.log(err)
            })
        }, 500)

        return () => clearTimeout(delayDebounceFn)
    }, [orderSearch,invoiceType]);

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
            api.get(`/invoices?page=1&size=5${invoiceSearch ? `&invoiceNumber=${invoiceSearch}` : ''}${invoiceType === 'AMENDED_INCOME' ? '&invoiceType=INCOME' : invoiceType === 'AMENDED_EXPENSE' ? '&invoiceType=EXPENSE' : ''}`).then((res) => {
                setInvoices(res.content)
            }).catch((err) => {
                console.log(err)
            })
        }, 500)

        return () => clearTimeout(delayDebounceFn)
    }, [invoiceSearch,invoiceType]);

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

    useEffect(() => {
        console.log('invoices',invoices)
    }, [invoices]);

    // PROVIDER ADDRESSES
    useEffect(() => {
        setDisabled((invoiceType === 'INCOME' || invoiceType === 'AMENDED_INCOME') && id !== 'new')
    }, [invoiceType,id]);

    function submitForm(event: React.SyntheticEvent) {
        event.preventDefault()

        const body = {
            invoiceStatus: status,
            invoiceType: invoiceType,
            emissionDate: emissionDate,
            dueDate: dueDate,
            customerId: customer?.id || null,
            providerId: provider?.id || null,
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
            orderId: order?.id && [order?.id] || null,
            items: items.map(({ totalAmount, ...rest } : any) => rest),
            amendmentReason: amendmentReason,
            amendedInvoiceId: invoice?.id || null,
        }

        if(id === 'new') {
            api.post('/invoices/final?type=' + (invoiceType), body).then((res) => {
                if(!!res) {
                    console.log('res',res,res.id)
                    setId(res.id)
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
                    setData(res)
                }
            }).catch((err) => {
                console.log(err)
            })
        }
        else {
            if(invoiceType === 'INCOME' || invoiceType === 'AMENDED_INCOME') {
                api.patch('/invoices/' + id, {invoiceStatus: status}).then((res) => {
                    if(!!res) {
                        setId(res.id)
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
                        setData(res)
                    }
                }).catch((err) => {
                    console.log(err)
                })
            }
            else {
                api.put('/invoices/' + id, body).then((res) => {
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
        api.get('/invoices/' + id + '/generate_pdf', 'arraybuffer').then((res) => {
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


    let invoiceTypeText = "INGRESO"
    if(invoiceType === "EXPENSE") invoiceTypeText = "GASTO"
    if(invoiceType === "AMENDED_INCOME") invoiceTypeText = "INGRESO RECTIFICATIVO"
    if(invoiceType === "AMENDED_EXPENSE") invoiceTypeText = "GASTO RECTIFICATIVO"

    return (
        <>
            <div className="hidden h-full flex-col md:flex">
                <div
                    className="flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-30">
                    <div className="ml-auto flex flex-col w-full space-x-2 sm:justify-end">
                        <h2 className="text-3xl font-bold tracking-tight w-full ">{invoiceNumber || 'Nueva factura'}</h2>
                        <p className="text-muted-foreground">{invoiceTypeText}</p>
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
                            {id === 'new' && 'Crear' ||'Guardar'}
                        </Button>
                    </div>
                </div>
                <Separator/>

                {id === 'new' && (
                    <Tabs defaultValue="INCOME" className="space-y-4 py-6" onValueChange={setInvoiceType}>
                        <TabsList>
                            <TabsTrigger value="INCOME">Ingreso</TabsTrigger>
                            <TabsTrigger value="EXPENSE">Gasto</TabsTrigger>
                            <TabsTrigger value="AMENDED_INCOME">Ingresos rectificados</TabsTrigger>
                            <TabsTrigger value="AMENDED_EXPENSE">Gastos rectificados</TabsTrigger>
                        </TabsList>
                    </Tabs>
                )}


                <div className={"h-full py-" + (id === 'new' ? '0' : '6')}>
                    <div className="md:order-1">
                        <div className={"w-full flex items-start gap-3"}>
                            <Card className={"w-full"}>
                                <CardHeader>
                                    <CardTitle>Información</CardTitle>
                                </CardHeader>
                                <CardContent>

                                    <div className={"grid grid-cols-" + ((invoiceType === 'AMENDED_INCOME' || invoiceType === 'AMENDED_EXPENSE') ? '3' : '2') + " grid-flow-col  gap-3 pt-3"}>

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

                                        {(invoiceType === 'AMENDED_INCOME' || invoiceType === 'AMENDED_EXPENSE') && invoices && (
                                            <div className={"w-full"}>
                                                <h3 className="text-sm font-normal text-muted-foreground">Factura a rectificar</h3>

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

                                        {(invoiceType === 'INCOME' || invoiceType === 'AMENDED_INCOME') && customers && (
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

                                        {(invoiceType === 'EXPENSE' || invoiceType === 'AMENDED_EXPENSE') && providers && (
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

                                    <div className={"grid grid-cols-3 grid-flow-col  gap-3 pt-3"}>
                                        <div clasName={"w-full"}>
                                            <h3 className="text-sm font-normal text-muted-foreground px-1">Fecha de Emisión</h3>
                                            <div className={"flex items-center gap-3"}>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full justify-start text-left font-normal",
                                                                !emissionDate && "text-muted-foreground"
                                                            )}
                                                            disabled={disabled/* || (invoiceType === 'INCOME' || invoiceType === 'AMENDED_INCOME')*/}
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
                                                {emissionDate && !disabled && (
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 p-0" onClick={() => setEmissionDate(undefined)} >
                                                        <CircleX />
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
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
                                    {(invoiceType === 'AMENDED_INCOME' || invoiceType === 'AMENDED_EXPENSE') && (
                                        <div className={"grid grid-cols-1 grid-flow-col  gap-3 pt-3"}>
                                            <div className={"w-full"}>
                                                <h3 className="text-sm font-normal text-muted-foreground px-1">Motivo de la modificación</h3>
                                                <Input
                                                    id="amendmentReason"
                                                    placeholder="Motivo de la modificación"
                                                    value={amendmentReason}
                                                    type="text"
                                                    autoCapitalize="none"
                                                    autoComplete="name"
                                                    autoCorrect="off"
                                                    onChange={(e) => setAmendmentReason(e.target.value)}
                                                    disabled={disabled}
                                                />
                                            </div>
                                        </div>
                                    )}
                                    {(invoiceType === 'EXPENSE' || invoiceType === 'AMENDED_EXPENSE') && (
                                        <div className={"grid grid-cols-1 grid-flow-col  gap-3 pt-3"}>
                                            <div className={"w-full"}>
                                                <h3 className="text-sm font-normal text-muted-foreground px-1">Referencia de la factura del proveedor</h3>
                                                <Input
                                                    id="providerInvoiceRef"
                                                    placeholder="Referencia de la factura del proveedor"
                                                    value={providerInvoiceRef}
                                                    type="text"
                                                    autoCapitalize="none"
                                                    autoComplete="name"
                                                    autoCorrect="off"
                                                    onChange={(e) => setProviderInvoiceRef(e.target.value)}
                                                    disabled={disabled}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                            <Card className={"w-full"}>
                                <CardHeader>
                                    <CardTitle>Dirección</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {directions && !disabled && (
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
                                    <DataTable type={"items"} content={items} edit={!disabled} id={id} editHook={setItems}  create={!disabled} remove={!disabled}/>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
