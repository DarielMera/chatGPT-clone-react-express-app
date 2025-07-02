import fetch from "node-fetch"
import express from "express"
import cors from "cors"
import dotenv from "dotenv" 

dotenv.config() 

const PORT = 7000
const app = express()

app.use(express.json())
app.use(cors())

const API_KEY = process.env.API_KEY 

app.post("/completions", async (req, res) => {
    const message = req.body.message
	const options = {
		method: "POST",
		headers: {
			Authorization: `Bearer ${API_KEY}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			model: "gpt-3.5-turbo",
			messages: [{ role: "user", content: message }],
			max_tokens: 100,
		}),
	}
	try {
		const response = await fetch("https://api.openai.com/v1/chat/completions", options)
		const data = await response.json()
		console.log(data);
		res.send(data)

	} catch (error) {
		console.error(error)
	}
})

console.log("hi")
app.listen(PORT, () => console.log("your server is running on PORT:" + PORT))
