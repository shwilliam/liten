import Alert from '@reach/alert'

type Props = {
  keyword: string
  data: string[]
}

const ToastsList = ({keyword, data}: Props) => (
  <div className="fixed bottom-0 right-0 left-0 md:left-auto z-50 text-center md:text-left md:py-4 md:px-4 -mb-1">
    {data.map((message, idx) => (
      <Alert key={idx}>
        <div className="px-2 py-4 md:py-2 md:my-1 bg-blue-500 items-center text-white leading-none md:rounded-full flex md:inline-flex border-b-2 border-white md:border-0">
          <span className="flex rounded-full bg-white text-blue-500 uppercase px-2 py-1 text-xs font-bold mr-3">
            {keyword}
          </span>
          <span className="font-semibold mr-2 text-left flex-auto">
            {message}
          </span>
        </div>
      </Alert>
    ))}
  </div>
)

export default ToastsList
