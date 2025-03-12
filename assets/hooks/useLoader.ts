import {useRouter} from "next/router";
import {useEffect} from "react";
import NProgress from "nprogress";


export const useLoader = () => {
    const router = useRouter()

    useEffect(() => {
        const startLoader = () => NProgress.start()
        const stopLoader = () => NProgress.done()

        router.events.on('routeChangeStart', startLoader)
        router.events.on('routeChangeComplete', stopLoader)
        router.events.on('routeChangeError', stopLoader)

        return () => {
            router.events.off('routeChangeStart', startLoader)
            router.events.off('routeChangeComplete', stopLoader)
            router.events.off('routeChangeError', stopLoader)
        }
    }, [router])
}