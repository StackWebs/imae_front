
export const activeColumns: any = {
    orders : [
        "orderNumber",
        "orderStatus",
        "sender", //(Adreça completa concatenada)
        "receiver", //(Adreça completa concatenada)
        "creationDate",
        "sentDate",
        "estimatedDeliveryDate",
        "deliveryDate",
        "customerReference",
        "customer" //(num client concatenat el nom)
    ],
    packages : [
        "description",
        "height",
        "width",
        "length",
        "weight"
    ],
    projects : [
        "projectNumber",
        "projectStatus",
        "creationDate",
        "endDate"
    ],
    invoices : [
        "invoiceNumber",
        "invoiceType",
        "status",
        "emissionDate",
        "dueDate"
    ],
    hauliers : [
        "haulierNumber",
        "companyName",
        "nif",
        "iban",
        "creationDate"
    ],
    customers : [
        "customerNumber",
        "name",
        "nif",
        "iban",
        "creationDate"
    ],
    providers : [
        "providerNumber",
        "name",
        "nif",
        "iban",
        "creationDate"
    ]
}
