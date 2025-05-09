import React, {useEffect} from "react";
import {Check, ChevronsUpDown, CircleX, Search} from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../../ui/popover"
import { Button } from "../../../ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "../../../ui/command"
import { cn } from "../../../lib/utils"
import {Label} from "../../../ui/label";
import {Input} from "../../../ui/input";

export function SelectSingle(props:any) {
    const [open, setOpen] = React.useState(false)

    console.log('props',props)

    const options = props.options
    const value = props.value
    const modifier = props.modifier
    const identifier = props.identifier || "id"
    const name = props.name || "name"
    const searchValue = props.searchValue
    const searchValueModifier = props.searchValueModifier
    const placeholder = props.placeholder
    const disabled = props.disabled

    if(
        !options ||
        !modifier ||
        !identifier ||
        !name
    ) return null

    return (
        <div className={disabled ? "flex items-center gap-3 cursor-not-allowed" : "flex items-center gap-3"}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-label="Load a preset..."
                        aria-expanded={open}
                        className="flex-1 justify-between w-full"
                        disabled={disabled}
                    >
                        {value ? value?.[name] : placeholder || "Seleccionar..."}
                        <ChevronsUpDown className="opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                    <Command>
                        <CommandList>
                            <div className="p-2">
                                <Input
                                    id="search"
                                    type="email"
                                    placeholder="Buscar..."
                                    value={searchValue}
                                    onChange={(e) => searchValueModifier(e.target.value)}
                                />
                            </div>
                            <CommandEmpty>No presets found.</CommandEmpty>
                            <CommandGroup>
                                {options.map((option:any) => (
                                    <CommandItem
                                        key={option[identifier]}
                                        onSelect={() => {
                                            modifier(option)
                                            setOpen(false)
                                        }}
                                    >
                                        {option[name]}
                                        <Check
                                            className={cn(
                                                "ml-auto",
                                                value?.[identifier] === option[identifier]
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            {value && !disabled && (
                <Button variant="ghost" size="icon" className="h-8 w-8 p-0" onClick={() => modifier(null)}>
                    <CircleX />
                </Button>
            )}
        </div>
    )
}
