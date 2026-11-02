'use client'

import { Button } from '@/components/ui/button'
import { getTokenFromClient } from '@/lib/getTokenFromClient'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const ReturnBorrowButton = ({ borrowId }: { borrowId: string }) => {
    const router = useRouter()
    const [isReturning, setIsReturning] = useState(false)

    async function handleReturn() {
        setIsReturning(true)
 const token = await getTokenFromClient()
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/borrows/${borrowId}`, {
            method: 'DELETE',
             headers: {
                authorization: `Bearer ${token}`,
            },
        })

        if (!res.ok) {
            setIsReturning(false)
            return
        }

        router.refresh()
    }

    return (
        <Button
            type="button"
            variant="outline"
            className="w-full"
            disabled={isReturning}
            onClick={handleReturn}
        >
            {isReturning ? 'Returning...' : 'Return'}
        </Button>
    )
}

export default ReturnBorrowButton