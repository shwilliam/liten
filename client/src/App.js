import React, {useState} from 'react'

const SocialTargetsSelectButton = ({value, onClick, children}) => {
  const handleClick = () => onClick(value)

  return (
    <button
      className="social-targets-select__button"
      type="button"
      value={value}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}
const SocialTargetsSelect = ({onChange}) => (
  <ul className="social-targets-select align-center">
    <li className="social-targets-select__item">
      <SocialTargetsSelectButton value="tweet" onClick={onChange}>
        generate tweet previews
      </SocialTargetsSelectButton>
    </li>
    <li className="social-targets-select__item">
      <SocialTargetsSelectButton value="url" onClick={onChange}>
        view site metatags
      </SocialTargetsSelectButton>
    </li>
    <li className="social-targets-select__item">
      <SocialTargetsSelectButton value={['tweet', 'url']} onClick={onChange}>
        show it all
      </SocialTargetsSelectButton>
    </li>
  </ul>
)

export const App = () => {
  const [socialTargets, setSocialTargets] = useState()

  const [error, setError] = useState()
  const [socials, setSocials] = useState()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()

    setError()
    setLoading(true)

    const formElements = e.currentTarget.elements
    const input_tweet = formElements[0] // FIXME
    const input_url = formElements?.input_url

    try {
      const body = JSON.stringify({
        tweet: input_tweet?.value,
        url: input_url?.value,
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
      {!socialTargets && (
        <section className="social-targets-select">
          <SocialTargetsSelect onChange={setSocialTargets} />
        </section>
      )}

      {socialTargets && !socials && (
        <section>
          <h2 className="hide-screens">Get socials form</h2>

          <form onSubmit={handleSubmit}>
            {socialTargets.includes('tweet') && (
              <>
                <label htmlFor="input_tweet">Tweet URL</label>
                <input
                  name="input_tweet"
                  id="input_tweet"
                  type="url"
                  placeholder="https://twitter.com/shwilliam/status/1337"
                  required={socialTargets.length === 1}
                />
              </>
            )}

            {socialTargets.includes('url') && (
              <>
                <label htmlFor="input_url">URL(s)</label>
                <textarea
                  name="input_url"
                  id="input_url"
                  rows="3"
                  placeholder="https://github.com/shwilliam"
                  required={socialTargets.length === 1}
                ></textarea>
              </>
            )}

            <button type="submit" disabled={loading}>
              get socials
            </button>
          </form>
        </section>
      )}

      {socialTargets && socials && (
        <>
          {Object.keys(socials)?.length === 0 && (
            <p>
              Nothing found{' '}
              <span role="img" aria-label="">
                🥺
              </span>
            </p>
          )}

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
                            <h3 className="subtitle">Site metadata</h3>
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
                    <h3 className="subtitle">Twitter</h3>
                    {socials.tweet?.embed && (
                      <code>{socials.tweet?.embed}</code>
                    )}

                    {socials.tweet?.preview && (
                      <img src={socials.tweet?.preview} alt="Twitter preview" />
                    )}
                  </section>
                )}
              </div>
            )}
          </section>
        </>
      )}
    </>
  )
}
