"use client"

import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Eye, EyeClosed } from "lucide-react"

type FormInputFieldProps = {
    field: any
    label: string
    placeholder?: string
    type?: string
    autoComplete?: string
    open?: boolean
    onOpenChange?: (open: boolean) => void
    className?: string
}

export function FormInputField({
    field,
    label,
    placeholder,
    type = "text",
    autoComplete = "off",
    open = false,
    onOpenChange,
    className,
}: FormInputFieldProps) {
    const isInvalid =
        field.state.meta.isTouched && !field.state.meta.isValid
    return (
        <Field data-invalid={isInvalid} >
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>

            <div className="flex flex-row items-center gap-1 relative">
                <Input
                    id={field.name}
                    name={field.name}
                    type={type === "password" ? (open ? "text" : "password") : type}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    aria-invalid={isInvalid}
                    className={className}
                />
                {type === "password"
                    ? open ? <span className="cursor-pointer absolute top-2 right-2" onClick={() => onOpenChange?.(!open)}><Eye size={20} /></span> : <span className="cursor-pointer absolute top-2 right-2" onClick={() => onOpenChange?.(!open)}><EyeClosed size={20} /></span>
                    : null
                }
            </div>

            {isInvalid && <FieldError errors={field.state.meta.errors} />}
        </Field>
    )
}