import { Button } from '../components/Button'

export default function Home() {
  return (
    <main>
      <h1 className="mb-4 text-3xl font-bold underline">
        Send transaction
      </h1>
      <form>
        <div className="flex flex-col space-y-4 w-80 mx-auto">
          <label className="block">
            <span className="text-gray-700">Recipient</span>
            <input type="text" placeholder="recipient" className="block rounded w-full" />
          </label>
          <label className="block">
            <span className="text-gray-700">Amount</span>
            <input type="number" placeholder="amount" className="block rounded w-full" />
          </label>
          <Button type="submit">
            Send
          </Button>
        </div>
      </form>
    </main>
  )
}
