import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import {Link, useNavigate} from "react-router-dom";
import React from "react";
import {cn} from "../../lib/utils";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../../ui/card";
import Logo from "../../assets/logo.png";
import {signIn} from "../../utils/Cognito";
import {useStore} from "../../store";

export const description =
    "A login page with two columns. The first column has the login form with email and password. There's a Forgot your passwork link and a link to sign up if you do not have an account. The second column has a cover image."

export const iframeHeight = "800px"

export const containerClassName = "w-full h-full p-4 lg:p-0"

export default function Login() {

    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const { setUser } = useStore();
    const navigate = useNavigate();

    function onSubmit(event: React.FormEvent) {
        event.preventDefault()

        if(!email || !password) {
            alert("Por favor, rellena todos los campos")
            return
        }

        signIn('gerard.rovellat','IMAELogistics1!').then((result) => {
            if(!!result.AccessToken) {
                setUser({
                    userName: 'gerard.rovellat',
                    accessToken: result.AccessToken || "",
                    expiresIn: result.ExpiresIn || 0,
                    idToken: result.IdToken || "",
                    refreshToken: result.RefreshToken || "",
                    tokenType: result.TokenType || ""
                })
                navigate("/")
            }
        })

    }

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <a href="#" className="flex items-center gap-2 self-center font-medium">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-imae_background text-primary-foreground">
                        <img className="p-1" src={Logo} alt="Logo" />
                    </div>
                    IMAE
                </a>
                <div className={cn("flex flex-col gap-6")}>
                    <Card>
                        <CardHeader className="text-center">
                            <CardTitle className="text-xl">Bienvenido</CardTitle>
                            <CardDescription>
                                Registrate para acceder a tu cuenta
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form>
                                <div className="grid gap-6">
                                    <div className="grid gap-6">
                                        <div className="grid gap-2">
                                            <Label htmlFor="email">Correo electrónico</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="email@example.com"
                                                required
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <div className="flex items-center">
                                                <Label htmlFor="password">Contraseña</Label>
                                                {/*<a
                                                    href="#"
                                                    className="ml-auto text-sm underline-offset-4 hover:underline"
                                                >
                                                    Forgot your password?
                                                </a>*/}
                                            </div>
                                            <Input id="password" type="password" required onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                        <Button type="submit" className="w-full" onClick={onSubmit}>
                                            Entrar
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
