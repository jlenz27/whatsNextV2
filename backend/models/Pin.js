const mongoose = require("mongoose");


const PinSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            require:true,
        },
        title:{
            type:String,
            require:true,
            min:3,
        },
        desc: {
            type: String,
            required: true,
            min: 3,
          },
      
        lat:{
            type:Number,
            require: true
        },
        long:{
            type:Number,
            require: true
        },

    },
    { timestamps: true }
);
//

module.exports = mongoose.model("Pin", PinSchema);