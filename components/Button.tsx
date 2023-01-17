export function Button({ type = "button", disabled = false, onClick = () => { }, children = null }: {
  type?: "button" | "submit" | "reset" | undefined,
  disabled?: boolean,
  onClick?: () => void
  children?: React.ReactNode,
}) {
  const classes = disabled
    ? 'inline-block px-6 py-2.5 bg-blue-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md focus:outline-none focus:ring-0 transition duration-150 ease-in-out pointer-events-none opacity-60'
    : 'inline-block px-6 py-2.5 bg-blue-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-600 hover:shadow-lg focus:bg-blue-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-lg transition duration-150 ease-in-out'

  return (
    <button type={type} disabled={disabled} className={classes} onClick={onClick}>
      {children}
    </button>
  )
}
