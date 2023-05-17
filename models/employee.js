const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true, 
    },
    position: {
      type: String,
      required: [true, "Please add a position"],
      trim: true,
    },
    image: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
    versionKey:false
  }
);

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;