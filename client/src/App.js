import React, {useState} from 'react'

export const App = () => {
  const [error, setError] = useState()
  const [socials, setSocials] = useState()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()

    setError()
    setLoading(true)

    const {
      input_url,
      input_text,
      input_ig,
      input_tweet,
    } = e.currentTarget.elements

    try {
      const response = await fetch(process.env.REACT_APP_API_URL, {
        method: 'POST',
        body: JSON.stringify({
          url: input_url.value,
          text: input_text.value,
          ig: input_ig.value,
          tweet: input_tweet.value,
        }),
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
          <label htmlFor="input_url">Site URL:</label>
          <input
            name="input_url"
            id="input_url"
            type="url"
            placeholder="https://shwilliam.com"
          />

          <label htmlFor="input_text">URL text:</label>
          <input name="input_text" id="input_text" type="text" />

          <label htmlFor="input_ig">Instagram handle:</label>
          <input
            name="input_ig"
            id="input_ig"
            type="text"
            placeholder="coolkid97"
          />

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
          <p className="socials">
            {(socials.url || socials.text?.length > 0) && (
              <section>
                <table>
                  <thead>
                    <tr>
                      <th colspan="5">
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
                    {socials.url && (
                      <tr>
                        {Object.values(socials.url).map(val => (
                          <td>{val}</td>
                        ))}
                      </tr>
                    )}
                    {socials.text?.map(socials => (
                      <tr>
                        {Object.values(socials).map(val => (
                          <td>{val}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            )}

            {socials.ig && (
              <section>
                <h3>Instagram</h3>
                {socials.ig && <img src={socials.ig} alt="Instagram post" />}
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
          </p>
        )}
      </section>
    </>
  )
}
