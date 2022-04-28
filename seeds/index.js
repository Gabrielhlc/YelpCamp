const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // MY USER ID
            author: '625db128f1d5d33c53edee0f',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam quam, eos iste quas consectetur veritatis incidunt officiis commodi beatae voluptatibus ut aspernatur aperiam quisquam natus qui quod? Magnam, tempora expedita.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dsaiaoffm/image/upload/v1650628708/YelpCamp/vb5pnefunzb47gkko6uo.jpg',
                    filename: 'YelpCamp/vb5pnefunzb47gkko6uo',
                },
                {
                    url: 'https://res.cloudinary.com/dsaiaoffm/image/upload/v1650628708/YelpCamp/irpovlmdik1e6ohzzyye.jpg',
                    filename: 'YelpCamp/irpovlmdik1e6ohzzyye',
                }
            ],
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})