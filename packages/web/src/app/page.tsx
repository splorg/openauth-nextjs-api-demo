import { auth, login, logout } from "../actions"
import { Link } from "next-view-transitions"

export default async function Home() {
  const subject = await auth()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Home Page</h1>
      <div>
        {subject ? (
          <>
            <p className="mb-4">
              Logged in as <code>{subject.properties.id}</code>.
            </p>
            <p>
              Visit the{" "}
              <Link href="/protected" className="text-blue-500 hover:text-blue-700 underline">
                protected page
              </Link>
              {" "}to see restricted content.
            </p>
          </>
        ) : (
          <>
            <p className="mb-4">Login with your email and password.</p>
          </>
        )}
      </div>

      <div className="mt-4">
        {subject ? (
          <form action={logout}>
            <button className="text-blue-500 hover:text-blue-700 underline">Logout</button>
          </form>
        ) : (
          <form action={login}>
            <button className="text-blue-500 hover:text-blue-700 underline">Login with OpenAuth</button>
          </form>
        )}
      </div>
    </div>
  )
}