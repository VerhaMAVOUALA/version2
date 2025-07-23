import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { apiURL } from '../lib/apiURL'
import { toast, Toaster } from 'sonner'
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from '../redux/userSlice'

const ProfilPage = () => {
  const { currentUser } = useSelector((state) => state.user)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  // 🟡 Pré-remplir les champs au montage
  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.username || "")
      setEmail(currentUser.email || "")
    }
  }, [currentUser])

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === "username") {
      setUsername(value)
    } else if (name === "email") {
      setEmail(value)
    } else if (name === "currentPassword") {
      setCurrentPassword(value)
    } else if (name === "newPassword") {
      setNewPassword(value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // ✅ Validation basique
    if (!username || !email) {
      toast.error("Nom d'utilisateur et email sont obligatoires.")
      return
    }

    try {
      dispatch(updateUserStart())
      setIsLoading(true)

      const response = await fetch(`${apiURL}/api/auth/update-user`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          currentPassword,
          newPassword,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success("Profil modifié avec succès.")
        dispatch(updateUserSuccess(data))
        // Réinitialiser les champs de mot de passe
        setCurrentPassword("")
        setNewPassword("")
      } else {
        toast.error("Erreur : " + (data.message || "Modification échouée"))
        dispatch(updateUserFailure(data.message || "Erreur serveur"))
      }
    } catch (error) {
      console.error(error)
      dispatch(updateUserFailure(error.message))
      toast.error("Une erreur est survenue : " + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-6">
      <Toaster />
      <h1 className="text-2xl font-bold mb-2">Profil</h1>
      <p className="mb-2">Voici votre profil</p>
      <div className="mb-4">
        <p><strong>Nom :</strong> {currentUser.username}</p>
        <p><strong>Email :</strong> {currentUser.email}</p>
        <p><strong>Rôle :</strong> {currentUser.role}</p>
      </div>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-4">Modifier votre profil</h2>
      <form onSubmit={handleSubmit} className="flex flex-col w-full md:w-1/2 gap-4">
        <input
          type="text"
          name="username"
          className="border border-gray-300 rounded-md p-2"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          className="border border-gray-300 rounded-md p-2"
          placeholder="Email"
          value={email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="currentPassword"
          className="border border-gray-300 rounded-md p-2"
          placeholder="Mot de passe actuel"
          value={currentPassword}
          onChange={handleChange}
        />
        <input
          type="password"
          name="newPassword"
          className="border border-gray-300 rounded-md p-2"
          placeholder="Nouveau mot de passe"
          value={newPassword}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
          disabled={isLoading}
        >
          {isLoading ? "En cours..." : "Modifier"}
        </button>
      </form>
    </div>
  )
}

export default ProfilPage
