
import { getServerSession } from "next-auth"


export default async function Home() {
  const session = await getServerSession();
  const username = session?.user?.name;
  return (
    <div>
      <h1 style={{paddingTop:"5vh", color:"white"}}>Welcome {username}</h1>
    </div>
  )
}
