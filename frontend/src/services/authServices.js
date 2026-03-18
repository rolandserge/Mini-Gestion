import axios from "../api/axios.js"

export async function login(formData) {
     
     const res = await axios.post("/login", formData)

     return res.data
}

export async function register(formData) {
     
     const res = await axios.post("/register", formData)

     return res.data
}

export async function logout() {
     
     const res = await axios.post("/logout")

     return res.data
}

export async function me() {

     const res = await axios.get("/me")

     return res.data
}