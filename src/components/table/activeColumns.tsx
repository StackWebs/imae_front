
export const activeColumns: any = {
    orders : [
        "orderNumber",
        "orderStatus",
        "sender", //(Adreça completa concatenada)
        "receiver", //(Adreça completa concatenada)
        "creationDate",
        "sentDate",
        //"estimatedDeliveryDate",
        "deliveryDate",
        "customerReference",
        "customer", //(num client concatenat el nom)
        "customerReference"
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
        "invoiceStatus",
        "emissionDate",
        "dueDate",
        "subtotalAmount",
        "taxesAmount",
        "totalAmount",
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
    ],
    customer_addresses : [
        "contactName",
        "city",
        "phone",
        "province",
        "street",
        "postalCode",
        "country"
    ],
    providers_addresses : [
        "contactName",
        "city",
        "phone",
        "province",
        "street",
        "postalCode",
        "country"
    ],
    items: [
        "id",
        "description",
        "units",
        "unitPrice",
        "totalAmount"
    ]
}
