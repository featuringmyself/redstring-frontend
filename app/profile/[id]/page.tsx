import axios from "axios";

export default async function Page({
                                       params,
                                   }: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const getProfile = async () => {
        const profile = await  axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/profile/${id}`)
        console.log(profile)
    }
    getProfile()
    return (
        <div></div>
    )
}