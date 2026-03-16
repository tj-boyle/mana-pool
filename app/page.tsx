import Image from "next/image";

export type Single = {
  url: string
  name: string
  set_code: string
  available_quantity: number
  scryfall_id: string
  price_cents: string
  price_market: string
}

export default async function Home() {

  // Map of scryfall_id to the image location
  const scryfallIds: { [key: string]: string } = {
    // On the Job
    '48b92629-4196-4943-91fd-8c8d5f3fcaef': 'https://cards.scryfall.io/large/front/4/8/48b92629-4196-4943-91fd-8c8d5f3fcaef.jpg',

    // Stamp of Approval
    'e832a07d-b417-47fa-8a29-c31f590c2e59': 'https://cards.scryfall.io/large/front/e/8/e832a07d-b417-47fa-8a29-c31f590c2e59.jpg',

    // Miracle Worker
    '35d29bda-096c-44d4-b45e-c2c507f8efbe': 'https://cards.scryfall.io/large/front/3/5/35d29bda-096c-44d4-b45e-c2c507f8efbe.jpg'
  }

  const emailHeader = process.env.MANA_POOL_EMAIL || ''
  const accessTokenHeader = process.env.MANA_POOL_ACCESS_TOKEN || ''

  const data = await fetch(`https://manapool.com/api/v1/products/singles?scryfall_ids=${Object.keys(scryfallIds).join('&scryfall_ids=')}&languages=EN`, {
    headers: {
      'email': emailHeader,
      'access-token': accessTokenHeader
    }
  })
  const singles = await data.json().then((res) => res.data)

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Singles</h1>
      {singles && singles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {singles.map((single: Single) => (
            <div key={single.name} className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
              {single.scryfall_id && (
                <Image
                  src={scryfallIds[single.scryfall_id]}
                  alt={single.name}
                  width={640}
                  height={891}
                  className="rounded mb-2"
                />
              )}
              <h2 className="text-xl font-semibold">{single.name}</h2>
              <p className="text-gray-600 mb-2">{single.set_code}</p>
              <p className="text-sm font-bold mb-1">Our Price: <span className="text-green-600">${single.price_cents}</span></p>
              <p className="text-sm font-bold">Market Price: <span className="text-green-600">${single.price_market}</span></p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No singles found</p>
      )}
    </div>
  );
}
