import React, {useEffect} from "react";

import {useParams} from "react-router-dom";


import {Input} from "../../ui/input";
import api from "../../utils/Api";
import {DataTable} from "../../components/table/table";
import {Button} from "../../ui/button";
import {Separator} from "../../ui/separator";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../../ui/card";


export default function Provider() {
    const { providerId } = useParams();

    const [providerNumber, setProviderNumber] = React.useState<string | undefined>(undefined)
    const [name, setName] = React.useState<string | undefined>(undefined)
    const [nif, setNif] = React.useState<string | undefined>(undefined)
    const [email, setEmail] = React.useState<string | undefined>(undefined)
    const [iban, setIban] = React.useState<string | undefined>(undefined)
    const [addresses, setAddresses] = React.useState<any | undefined>(undefined)

    useEffect(() => {
        api.get('/providers/' + providerId).then((res) => {
            setProviderNumber(res.providerNumber)
            setName(res.name)
            setNif(res.nif)
            setEmail(res.email)
            setIban(res.iban)
            setAddresses(res.addresses)
            console.log(res)
        }).catch((err) => {
            setName("Name")
            setNif("4158541Z")
            setEmail("gotcritgmarc@gmail.com")
            setIban("ES05 4589 4587 4589 5325")
            setAddresses([
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
                },
                {
                    "id": 3,
                    "name": "string",
                    "city": "string",
                    "phone": "string",
                    "province": "string",
                    "street": "string",
                    "postalCode": "string",
                    "country": "string"
                }
            ])
            console.log(err)
        })
    }, []);

    function submitForm(event: React.SyntheticEvent) {
        event.preventDefault()

        api.put('/providers/' + providerId, {
            name: name,
            nif: nif,
            email: email,
            iban: iban
        }).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <>
            <div className="hidden h-full flex-col md:flex">
                <div
                    className="flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-30">
                    <div className="ml-auto flex flex-col w-full space-x-2 sm:justify-end">
                        <h2 className="text-3xl font-bold tracking-tight w-full ">{name}</h2>
                        <p className="text-muted-foreground">{providerNumber}</p>
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
                                    value={name}
                                    type="text"
                                    autoCapitalize="none"
                                    autoComplete="name"
                                    autoCorrect="off"
                                    onChange={(e) => setName(e.target.value)}
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
                                    id="email"
                                    placeholder="email"
                                    value={email}
                                    type="email"
                                    autoCapitalize="none"
                                    autoComplete="email"
                                    autoCorrect="off"
                                    onChange={(e) => setEmail(e.target.value)}/>
                                <Input
                                    id="iban"
                                    placeholder="iban"
                                    value={iban}
                                    type="text"
                                    autoCapitalize="none"
                                    autoComplete="iban"
                                    autoCorrect="off"
                                    onChange={(e) => setIban(e.target.value)}/>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="pt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Direcciones</CardTitle>
                            <CardDescription>Lista de direcciones del cliente</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {/*<DataTable type={"customers_addresses"} id={customerId}/>*/}
                            {addresses &&
                                <DataTable type={"addresses"} content={addresses} edit={true}/>
                            }
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    )
}
