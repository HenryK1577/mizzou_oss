export default function Header() {
  const items = [
    { name: 'Home', route: '/' },
    { name: 'About', route: '/about' },
    { name: 'Login', route: '/login' },
  ]
  return (
    <nav>
      <ul className="flex flex-row justify-center items-center">
        {items.map((item, i) => (
          <li className="px-4 py-2" key={i}>
            <a href={item.route}>{item.name}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
