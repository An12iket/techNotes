import React from 'react'
import { Link } from 'react-router-dom'

const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1>Welcome to <span className="nowrap">Repairs!</span></h1>
      </header>
      <main className="public__main">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum quia eum vel sed aut. Expedita facilis vitae eaque nobis quo voluptate magni? Quia architecto odio repellat quaerat qui molestiae facilis.</p>
        <address className="public__addr">
          Repairs<br />
          555 Foo Drive<br />
          Foo City, CA 12345<br />
          <a href="tel:+15555555555">(555) 555-5555</a>
        </address>
        <br />
        <p>Owner: xyzyz</p>
      </main>
      <footer>
        <Link to="/login">Employee Login</Link>
      </footer>
    </section>

  )
  return content
}

export default Public
