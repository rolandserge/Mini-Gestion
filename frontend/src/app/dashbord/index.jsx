import React from 'react'
import { useAuth } from '../../store/authStore'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

export default function Dashbord() {

    const { logoutAction, user } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async() => {

        try {
            await logoutAction()

            toast.success("Deconnexion reussi !")
            navigate("/auth/login")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <span>La personne connecté est {user.name}</span>
            <p>c'est la page apres la connexion de l'utilisateur</p>

            <button onClick={() => handleLogout()}>Deconnexion</button>
        </div>
    )
}
