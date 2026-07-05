"use client"

import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { useEffect, useState } from "react"

type Cheval = {
  id: number
  name: string
  breed: string | null
  created_at: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000"

export default function ChevauxPage() {
  const [chevaux, setChevaux] = useState<Cheval[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`${API_URL}/horses`)
      .then((res) => {
        if (!res.ok) throw new Error(`Erreur ${res.status}`)
        return res.json()
      })
      .then((data: Cheval[]) => setChevaux(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const chevauxTries = chevaux

  return (
    <div className="min-h-screen bg-equestre-background">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 pb-24">
        {loading && (
          <p className="text-center text-equestre-muted">Chargement...</p>
        )}
        {error && (
          <p className="text-center text-equestre-alert">Erreur : {error}</p>
        )}
        <h1 className="text-3xl font-bold text-equestre-primary mb-6">
          Liste des chevaux
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {chevauxTries.map((cheval) => (
            <Link key={cheval.id} href={`/cheval/${cheval.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-equestre-border bg-white p-0">
                {/* Horse Image */}
                <div className="relative h-48 w-full overflow-hidden bg-equestre-soft rounded-t-lg">
                  <Image
                    src="/Cheval1.jpg"
                    alt={cheval.name}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>

                <div className="p-6">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-equestre-primary">
                      {cheval.name}
                    </h3>
                    <div className="space-y-1 text-sm text-equestre-muted">
                      <p className="flex items-center gap-2">
                        <span className="font-medium text-equestre-primary">Race:</span>
                        <span>{cheval.breed ?? "—"}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}