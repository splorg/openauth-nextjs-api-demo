import { auth, login, logout } from "../actions"
import Link from "next/link"

export default async function Home() {
  const subject = await auth()

  return (
    <div>
      <main>
        <ol>
          {subject ? (
            <>
              <li>
                Logged in as <code>{subject.properties.id}</code>.
              </li>
              <li>
                Visit the{" "}
                <Link href="/protected" className="text-blue-500 hover:text-blue-700 underline">
                  protected page
                </Link>
                {" "}to see restricted content.
              </li>
            </>
          ) : (
            <>
              <li>Login with your email and password.</li>
              <li>
                And then check out <code>app/page.tsx</code>.
              </li>
            </>
          )}
        </ol>

        <div>
          {subject ? (
            <form action={logout}>
              <button>Logout</button>
            </form>
          ) : (
            <form action={login}>
              <button>Login with OpenAuth</button>
            </form>
          )}
        </div>
      </main>
    </div>
  )
}