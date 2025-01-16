import { Link } from "next-view-transitions"
import { getUser } from "../../lib/api"

export default async function ProtectedPage() {
  const user = await getUser();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Protected Page</h1>
      <p className="mb-4">
        If you can see this, you are authenticated.
      </p>
      <p>User data from protected API:</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <div className="mt-4">
        <Link
          href="/"
          className="text-blue-500 hover:text-blue-700 underline"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
} 