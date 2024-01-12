import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
const port = process.env.PORT;
const key = process.env.KEY;

const app = express();
const { Schema } = mongoose;
app.use(express.json());
app.use(cors());

const servicesSchema = new mongoose.Schema({
  title: String,
  description: String,
  icon: String,
});
const servicesModel = mongoose.model("services", servicesSchema);

app.get("/services", async (req, res) => {
  try {
    const services = await servicesModel.find({});
    res.status(200).json(services);
  } catch (error) {
    res.send("Services are not found!");
  }
});
app.get("/services/:id", async (req, res) => {
  const { id } = req.params;
  const service = await servicesModel.findById(id);
  res.send(service);
});
app.post("/services", async (req, res) => {
  try {
    const { title, description, icon } = req.body;
    const newService = new servicesModel({ title, description, icon });
    await newService.save();
    res.send("Service is created!");
  } catch (error) {
    res.send("Service is not created!");
  }
});
app.delete("/services/:id", async (req, res) => {
  const { id } = req.params;
  const service = await servicesModel.findByIdAndDelete(id);
  res.send(service);
});

mongoose
  .connect(key)
  .then(() => console.log("Connected!"))
  .catch(() => console.log("Not connected!"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
