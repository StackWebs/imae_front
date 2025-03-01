import React, {useEffect} from "react";

import {useParams} from "react-router-dom";


import {Input} from "../../ui/input";
import api from "../../utils/Api";
import {DataTable} from "../../components/table/table";
import {Button} from "../../ui/button";
import {Separator} from "../../ui/separator";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../../ui/card";
import {toast} from "react-toastify";


export default function Haulier() {
    const { haulierId } = useParams();

    const [haulierNumber, setHaulierNumber] = React.useState<string | undefined>(undefined)
    const [companyName, setCompanyName] = React.useState<string | undefined>(undefined)
    const [nif, setNif] = React.useState<string | undefined>(undefined)
    const [email, setEmail] = React.useState<string | undefined>(undefined)
    const [iban, setIban] = React.useState<string | undefined>(undefined)
    const [addressCity, setAddressCity] = React.useState<any | undefined>(undefined)
    const [addressContactName, setAddressContactName] = React.useState<any | undefined>(undefined)
    const [addressPhone, setAddressPhone] = React.useState<any | undefined>(undefined)
    const [addressProvince, setAddressProvince] = React.useState<any | undefined>(undefined)
    const [addressStreet, setAddressStreet] = React.useState<any | undefined>(undefined)
    const [addressPostalCode, setAddressPostalCode] = React.useState<any | undefined>(undefined)
    const [addressCountry, setAddressCountry] = React.useState<any | undefined>(undefined)

    useEffect(() => {
        api.get('/hauliers/' + haulierId).then((res) => {
            setHaulierNumber(res.haulierNumber)
            setCompanyName(res.companyName)
            setNif(res.nif)
            setIban(res.iban)
            setEmail(res.email)
            setAddressCity(res.address.city)
            setAddressContactName(res.address.contactName)
            setAddressPhone(res.address.phone)
            setAddressProvince(res.address.province)
            setAddressStreet(res.address.street)
            setAddressPostalCode(res.address.postalCode)
            setAddressCountry(res.address.country)
        }).catch((err) => {
            console.log(err)
        })
    }, []);

    function submitForm(event: React.SyntheticEvent) {
        event.preventDefault()

        api.put('/hauliers/' + haulierId, {
            name: name,
            nif: nif,
            email: email,
            iban: iban
        }).then((res) => {
            console.log(res)
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
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <>
            <div className="hidden h-full flex-col md:flex">
                <div className="flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-30">
                    <div className="ml-auto flex flex-col w-full space-x-2 sm:justify-end">
                        <h2 className="text-3xl font-bold tracking-tight w-full ">{companyName}</h2>
                        <p className="text-muted-foreground">{haulierNumber}</p>
                    </div>
                    <div className="ml-auto flex w-full space-x-2 sm:justify-end">
                        <Button onClick={submitForm}>Guardar</Button>
                    </div>
                </div>
                <Separator/>
                <div className="pt-6">
                <Card>
                        <CardHeader>
                            <CardTitle>Datos</CardTitle>
                            <CardDescription>Información general del cliente</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className={"flex items-center gap-3"}>
                                <Input
                                    id="name"
                                    placeholder="nombre"
                                    value={companyName}
                                    type="text"
                                    autoCapitalize="none"
                                    autoComplete="name"
                                    autoCorrect="off"
                                    onChange={(e) => setCompanyName(e.target.value)}
                                />
                                <Input
                                    id="nif"
                                    placeholder="nif"
                                    value={nif}
                                    type="text"
                                    autoCapitalize="none"
                                    autoComplete="nif"
                                    autoCorrect="off"
                                    onChange={(e) => setNif(e.target.value)}/>
                                <Input
                                    id="iban"
                                    placeholder="iban"
                                    value={iban}
                                    type="text"
                                    autoCapitalize="none"
                                    autoComplete="iban"
                                    autoCorrect="off"
                                    onChange={(e) => setIban(e.target.value)}/>
                                <Input
                                    id="email"
                                    placeholder="email"
                                    value={email}
                                    type="email"
                                    autoCapitalize="none"
                                    autoComplete="email"
                                    autoCorrect="off"
                                    onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="pt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Direccion</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className={"flex items-center gap-3"}>
                                <Input
                                    id="addressCity"
                                    placeholder="addressCity"
                                    value={addressCity}
                                    type="text"
                                    autoCapitalize="none"
                                    autoComplete="name"
                                    autoCorrect="off"
                                    onChange={(e) => setAddressCity(e.target.value)}
                                />
                                <Input
                                    id="addressContactName"
                                    placeholder="addressContactName"
                                    value={addressContactName}
                                    type="text"
                                    autoCapitalize="none"
                                    autoComplete="nif"
                                    autoCorrect="off"
                                    onChange={(e) => setAddressContactName(e.target.value)}/>
                                <Input
                                    id="addressPhone"
                                    placeholder="addressPhone"
                                    value={addressPhone}
                                    type="text"
                                    autoCapitalize="none"
                                    autoComplete="iban"
                                    autoCorrect="off"
                                    onChange={(e) => setAddressPhone(e.target.value)}/>
                                <Input
                                    id="addressProvince"
                                    placeholder="addressProvince"
                                    value={addressProvince}
                                    type="text"
                                    autoCapitalize="none"
                                    autoComplete="email"
                                    autoCorrect="off"
                                    onChange={(e) => setAddressProvince(e.target.value)}/>
                                <Input
                                    id="addressStreet"
                                    placeholder="addressStreet"
                                    value={addressStreet}
                                    type="text"
                                    autoCapitalize="none"
                                    autoComplete="email"
                                    autoCorrect="off"
                                    onChange={(e) => setAddressStreet(e.target.value)}/>
                                <Input
                                    id="addressPostalCode"
                                    placeholder="addressPostalCode"
                                    value={addressPostalCode}
                                    type="text"
                                    autoCapitalize="none"
                                    autoComplete="email"
                                    autoCorrect="off"
                                    onChange={(e) => setAddressPostalCode(e.target.value)}/>
                                <Input
                                    id="addressCountry"
                                    placeholder="addressCountry"
                                    value={addressCountry}
                                    type="text"
                                    autoCapitalize="none"
                                    autoComplete="email"
                                    autoCorrect="off"
                                    onChange={(e) => setAddressCountry(e.target.value)}/>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    )
}
