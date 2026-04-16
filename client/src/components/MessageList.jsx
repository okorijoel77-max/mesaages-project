import MessageCard from "./MessageCard";

export default function MessageList({ messages, onDelete }) {
  if (!messages || messages.length === 0) {
    return <p>No messages yet</p>;
  }

  return (
    <div>
      {messages.map(msg => (
        <MessageCard key={msg.id} msg={msg} onDelete={onDelete} />
      ))}
    </div>
  );
}
