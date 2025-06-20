import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
    name : {
        type : String,
        required: [true, 'Name is required'],
        trim : true, // this will remove any leading or trailing spaces
        minLength: [3, 'Name must be at least 3 characters long'],
        maxLength: [50, 'Name must be at most 50 characters long']
    } , 
    price : {
        type : Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be a positive number']
    } , 
    currency : {
        type : String,
        required: [true, 'Currency is required'],
        trim: true, 
        enum : ['USD', 'EUR', 'GBP', 'INR', 'JPY'] , 
        default: 'USD' // Default currency is USD
    } , 
    frequency : {
        type : String,
        required: [true, 'Frequency is required'],
        enum : ['monthly', 'yearly'], // Subscription can be monthly or yearly
        default: 'monthly' // Default frequency is monthly
    } ,
    category : {
        type : String,
        enum : ['sports' , 'news' , 'entertainment' , 'education' , 'health'] ,
        required: [true, 'Category is required']
    } , 
    paymentMethod : {
        type : String , 
        required: [true, 'Payment method is required'],
        trim : true,

    } , 
    status : {
        type : String,
        enum : ['active', 'inactive', 'cancelled'],
        default: 'active' // Default status is active
    } , 
    startDate : {
        type : Date,
        required: [true, 'Start date is required'],
        validate : {
            validator: function(value) {
                return value <= new Date(); // Start date cannot be in the future
                } , 
                message: 'Start date cannot be in the future' , 
        } 
    } , 
    endDate : {
        type : Date ,
        required: [true, 'End date is required'],
        validate : {
            validator: function(value) {
                return value > this.startDate; // End date must be after start date
            },
            message: 'End date must be after start date'
        }
    } , 
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: [true, 'User is required'] , // Subscription must be associated with 
        index : true
    }

} , {
    timestamps: true 
}) ; 

// auto calculate the renual date based on the data 
subscriptionSchema.pre('save' , function(next) {
    if(!this.renewalDate){
        const renewalPeriod = {
            daily : 1 , 
            weekly : 7 ,
            monthly : 30 ,
            yearly : 365
        } ; 
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriod[this.frequency]);
    }

    if(this.renewalDate < new Date()) {
        this.status = 'inactive'; 

    }

    next();

})

const Subscription = mongoose.model('Subscription', subscriptionSchema);
export default Subscription;


