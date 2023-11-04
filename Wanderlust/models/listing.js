const mongoose = require ("mongoose");
const Review = require("./review");

const Schema = mongoose.Schema;

const listingSchema = new Schema ({
    title : {
        type : String,
        required : true,
    },
    description : String,
    // image : {
    //     type : String,
    //     set : (v) => v === "" ? "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" : v,
    //     default : "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    // },
    image : {
        url : String,
        filename : String,
    },
    price : Number,
    location : String,
    country : String,
    reviews : [
        {
           type:Schema.Types.ObjectId,
           ref: "Review",
        },
    ],
    owner : {
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    geometry: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      },
    //   category: {
    //     type:String,
    //     enum: ["mountains","artic", "farms", "camping", "castles", "iconic cities", "rooms", "amazing pools"]
    //   }
})

listingSchema.post("findOneAndDelete", async (listing) => {
    if(listing) {
        await Review.deleteMany({_id: {$in : listing.reviews}});
    }

})

const Listing = mongoose.model ( "Listing", listingSchema);
module.exports = Listing;