export interface Order {

    subtotal: Number,
    total: Number,
    customerFirstName: String,
    customerLastName: String,
    customerPhoneNumber: String,
    customerEmail: String,
    pickUp: boolean,
    address: String,
    city: String,
    state: String,
    zip: String,
    orderLines: any[]


}