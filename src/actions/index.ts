export const fetcher = async (
  url: string,
  options: { body?: string; method?: string }
) => {
  let data = null
  let error = null
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      ...options,
    })

    if ([200, 201].includes(res.status)) {
      data = await res.json()
    }

    if ([403].includes(res.status)) error = 'error'
  } catch (error) {
    error = error
  }

  return { data, error }
}
