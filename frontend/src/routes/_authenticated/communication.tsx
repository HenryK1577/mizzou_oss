import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/_authenticated/communication')({
  component: RouteComponent,
})

function CommunicationUserList() {
  const fakeUsers = ['Alice', 'Bob', 'Carla']
  const [clicked, setClicked] = useState(-1)
  return (
    <>
      <h2>Users</h2>
      <ul>
        {fakeUsers.map((user, i) => (
          <li key={i}>
            <button
              className={`${clicked == i ? 'bg-gray-400' : 'bg-white'}`}
              onClick={() => {
                if (clicked == i) {
                  setClicked(-1)
                } else {
                  setClicked(i)
                }
              }}
            >
              {user}
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}

function CommunicationChat() {
  return (
    <div>
      <h2>Select a user</h2>

      <ul></ul>

      <form>
        <input
          type="text"
          name="message"
          placeholder="Type a message and press Enter"
          autoComplete="off"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}

function RouteComponent() {
  return (
    <>
      <CommunicationUserList />
      <CommunicationChat />
    </>
  )
}
