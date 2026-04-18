<form onSubmit={handleSubmit}>
  <input
    placeholder="Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
  />

  <input
    placeholder="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />

  <input
    placeholder="Message"
    value={message}
    onChange={(e) => setMessage(e.target.value)}
  />

  <button type="submit">Send</button>
</form>
