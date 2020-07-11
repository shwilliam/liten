import React, {useState} from 'react'

export const App = () => {
  const [error, setError] = useState()
  const [socials, setSocials] = useState()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()

    setError()
    setLoading(true)

    const {input_url, input_tweet} = e.currentTarget.elements

    try {
      const body = JSON.stringify({
        url: input_url.value,
        tweet: input_tweet.value,
      })

      const response = await fetch(process.env.REACT_APP_API_URL, {
        method: 'POST',
        body,
      })

      const responseJson = await response.json()

      setSocials(responseJson)
    } catch (error) {
      console.error(error)
      setError('Unable to get socials 😭')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section>
        <h2 className="hide-screens">Get socials form</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="input_url">URL(s):</label>
          <textarea
            name="input_url"
            id="input_url"
            rows="3"
            placeholder="https://github.com/shwilliam"
          ></textarea>

          <label htmlFor="input_tweet">Tweet URL:</label>
          <input
            name="input_tweet"
            id="input_tweet"
            type="url"
            placeholder="https://twitter.com/shwilliam/status/1337"
          />

          <button type="submit" disabled={loading}>
            GET SOCIALS
          </button>
        </form>
      </section>

      <section aria-live="polite">
        <h2 className="hide-screens">Socials results</h2>

        {loading && <p className="loading">loading...</p>}

        {error && <p className="error">{error}</p>}

        {socials && (
          <div className="socials">
            {socials.url?.length > 0 && (
              <section>
                <table>
                  <thead>
                    <tr>
                      <th colSpan="5">
                        <h3>Site metadata</h3>
                      </th>
                    </tr>
                    <tr>
                      <th>URL</th>
                      <th>Title</th>
                      <th>Favicon</th>
                      <th>Description</th>
                      <th>Image</th>
                    </tr>
                  </thead>
                  <tbody>
                    {socials.url?.map(site => (
                      <tr key={`socials-url-${site.url}`}>
                        <td>{site.url}</td>
                        <td>{site.title}</td>
                        <td>{site.favicon}</td>
                        <td>{site.description}</td>
                        <td>{site.image}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            )}

            {socials.tweet && (
              <section>
                <h3>Twitter</h3>
                {socials.tweet?.embed && <code>{socials.tweet?.embed}</code>}

                {socials.tweet?.preview && (
                  <img src={socials.tweet?.preview} alt="Twitter preview" />
                )}
              </section>
            )}
          </div>
        )}
      </section>
    </>
  )
}
