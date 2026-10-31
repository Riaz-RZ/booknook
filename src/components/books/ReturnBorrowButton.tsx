'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const ReturnBorrowButton = ({ borrowId }: { borrowId: string }) => {
    const router = useRouter()
    const [isReturning, setIsReturning] = useState(false)

    async function handleReturn() {
        setIsReturning(true)

        const res = await fetch(`http://localhost:8000/borrows/${borrowId}`, {
            method: 'DELETE',
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
