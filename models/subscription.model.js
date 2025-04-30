import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, 'Subscription name is required'],
      trim: true,
      minlength: [3, 'Subscription name must be at least 3 characters long'],
      maxlength: [50, 'Subscription name must be less than 50 characters long'],
   },
   price: {
      type: Number,
      required: [true, 'Subscription price is required'],
      min: [0, 'Subscription price must be greater than 0'],
      max: [1000, 'Subscription price must be less than 1000'],
   },
   currency: {
      type: String,
      enum: ['USD', 'EUR', 'VND'],
      default: 'USD',
   },
   frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly', 'yearly'],
   },
   category: {
      type: String,
      enum: ['sport', 'streaming', 'music', 'news', 'other'],
      required: [true, 'Subscription category is required'],
   },
   paymentMethod: {
      type: String,
      required: [true, 'Payment method is required' ],
      trim: true,
   },
   status: {
      type: String,
      enum: ['active', 'cancelled', 'expired'],
      default: 'active',
   },
   startDate: {
      type: Date,
      required: true,
      validate: {
         validator: (value) => {
            return value < new Date();
         },
         message: 'Start date must be in the past',
      }
   },
   renewalDate: {
      type: Date,
      required: true,
      validate: {
         validator: function(value) {
            return value > this.startDate;
         },
         message: 'Renewal date must be after start date',
      }
   },
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
   }
}, {timestamps: true});


// Pre-save middleware to set renewal date and status
subscriptionSchema.pre('save', function(next) {
   // Set renewal date if not provided
   if (!this.renewalDate) {
      const renewalPeriods = {
         daily: 1,
         weekly: 7,
         monthly: 30,
         yearly: 365,
      };
      // Calculate renewal date based on frequency
      this.renewalDate = new Date(this.startDate);
      // Add the renewal period to the start date
      this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
   }
   
   // Auto-update the status if renewal date has passed
   if (this.renewalDate < new Date()) {
      this.status = 'expired';
   }

   next();
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;

