const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

async function main() {
    await mongoose.connect(process.env.DATABASE_URL);
}
main()
.then(() => {
  console.log("Connection Successful") ; 
})
.catch((err) => console.log(err));


let allChats = [
    {
        from:"Radha",
        to:"Ram",
        message:"Lets go for picnic",
        created_at: new Date()
    },
    {
        from: "Rahul",
        to: "Simran",
        message: "Did you finish the project report?",
        created_at: new Date()
    },
    {
        from:"Muskan",
        to:"Kalpesh",
        message:"Hey, how are you?",
        created_at: new Date()
    },
    {
        from: "Anjali",
        to: "Vikram",
        message: "Don't forget the meeting at 3 PM.",
        created_at: new Date()
    },
    {
        from: "Meera",
        to: "Arjun",
        message: "Good luck with your presentation!",
        created_at: new Date()
    },
    {
        from: "Maheshwar",
        to:"Raj",
        message:"Lets play cricket today",
        created_at: new Date()
    }
]

Chat.insertMany(allChats);