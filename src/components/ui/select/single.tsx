import React, {useEffect} from "react";
import { Check, ChevronsUpDown } from "lucide-react"
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

export function SelectSingle(props:any) {
    const [open, setOpen] = React.useState(false)

    const options = props.options
    const value = props.value
    const modifier = props.modifier
    const identifier = props.identifier || "id"
    const name = props.name || "name"
    const searchValueModifier = props.searchValueModifier


    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-label="Load a preset..."
                    aria-expanded={open}
                    className="flex-1 justify-between w-full"
                >
                    {value ? value.name : "Load a preset..."}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
                <Command>
                    <CommandInput
                        placeholder="Search presets..."
                        onValueChange={(value) => {
                            if(searchValueModifier) searchValueModifier(value)
                        }}
                    />
                    <CommandList>
                        <CommandEmpty>No presets found.</CommandEmpty>
                        <CommandGroup heading="Examples">
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
    )
}
