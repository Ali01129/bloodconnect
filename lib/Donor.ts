import mongoose from "mongoose";

const donorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    group: { type: String, required: true },
    city: { type: String, required: true },
    phone1: { type: String, required: true },
    phone2: { type: String, required: false },
    phoneIsWhatsApp: { type: Boolean, default: true },
    aboutDonor: { type: String, required: false },
    donationHistory: { type: String, required: false },
  },
  { timestamps: true }
);

const Donor = mongoose.models.Donor || mongoose.model("Donor", donorSchema);
export default Donor;
