import React from "react"
import { Search } from "lucide-react"

import { Label } from "../../ui/label"
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarInput,
} from "../../ui/sidebar"
import {Input} from "../../ui/input";
import api from "../../utils/Api";
import {useNavigate} from "react-router-dom";

export function SearchForm({ ...props }: React.ComponentProps<"form">) {

    const [search, setSearch] = React.useState<string | undefined>("")
    const navigate = useNavigate();

    // on enter key press
    function searchOrder(event: any) {
        event.preventDefault()
        api.get('/orders?orderNumber=' + search).then((res) => {
            if(res.content.length > 0 && res.content[0].id) {
                //useNavigate('/order/' + res.content[0].id)
                navigate('/order/' + res.content[0].id)
            }
            else {
                alert('No order found')
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <form {...props}>
            <SidebarGroup className="py-0">
                <SidebarGroupContent className="relative">
                    <Label htmlFor="search" className="sr-only">
                        Search
                    </Label>
                    <Search
                        className="cursor-pointer absolute right-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50"
                        onClick={searchOrder}
                    />
                    <Input
                        id="search"
                        placeholder="Search the docs..."
                        value={search}
                        type="text"
                        autoCapitalize="none"
                        autoComplete="name"
                        autoCorrect="off"
                        className={"pr-8 h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => {if(e.key === 'Enter') { searchOrder(e)}}}
                    />
                </SidebarGroupContent>
            </SidebarGroup>
        </form>
    )
}
