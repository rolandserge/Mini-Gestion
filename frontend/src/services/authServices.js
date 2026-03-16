import axios from "../api/axios.js"


export async function login(formData) {
     
     try {
          const res = await axios.post("/login", formData)

          if(res.status == 201) {
               console.log(res)
               return res
          } else {
               console.log(res)
               return res
          }
     } catch (error) {
          console.log(error)
          return error
     }
}

export async function register(formData) {
     
     try {
          const res = await axios.post("/register", formData)

          if(res.status == 201) {
               console.log(res)
               return res
          } else {
               console.log(res)
               return res
          }
     } catch (error) {
          console.log(error)
          return error
     }
}

export async function logout() {
     try {
          const res = await axios.post("/logout")

          return res
     } catch (error) {
          return error
     }
}

export async function me() {

     try {
          const res =  await axios.get("/me")

          return res
     } catch (error) {
          console.log(error)
          return error
     }
}