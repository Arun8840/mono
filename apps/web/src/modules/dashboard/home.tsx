"use client"

import { useQuery } from "@tanstack/react-query"
import { client } from "@repo/server/client"
import { Button, Spinner } from "@repo/ui/components"
function Home() {
  const { isPending, data } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await client.tasks.get()
      return res
    },
  })

  if (isPending) return <Spinner />
  return (
    <div>
      <h1>
        <Button>{data?.data?.[0]?.name}</Button>
      </h1>
    </div>
  )
}

export default Home
