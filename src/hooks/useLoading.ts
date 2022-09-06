import { useState } from "react";

const useLoading = () => {
    const [loading, setLoading] = useState(false);

    const startLoading = async (cb: () => Promise<any>) => {
        setLoading(true)
        const response = await cb()
        setLoading(false)
        return response
    }

    return { loading, startLoading }
}

export default useLoading