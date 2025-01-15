import { auth } from "../../actions"
import Link from "next/link"

export default async function ProtectedPage() {
  const subject = await auth()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Protected Page</h1>
      <p className="mb-4">
        If you can see this, you are authenticated as:{" "}
        <code>{subject && subject.properties.id}</code>
      </p>
      <Link 
        href="/"
        className="text-blue-500 hover:text-blue-700 underline"
      >
        Back to Home
      </Link>
    </div>
  )
} 