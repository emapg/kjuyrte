import { useState } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [buttons, setButtons] = useState([{ label: '', url: '' }]);

  const handleAddButton = () => {
    setButtons([...buttons, { label: '', url: '' }]);
  };

  const handleButtonChange = (index, field, value) => {
    const newButtons = [...buttons];
    newButtons[index][field] = value;
    setButtons(newButtons);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/sendMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, imageUrl, buttons }),
    });

    const data = await response.json();
    alert(data.success ? 'Message sent!' : `Error: ${data.error}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-6 text-blue-600">Telegram Bot Messenger</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-xl space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">Text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="4"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your message..."
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL (optional)</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter an image URL..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Inline Buttons (optional)</label>
          {buttons.map((button, index) => (
            <div key={index} className="flex space-x-2 mt-2">
              <input
                type="text"
                placeholder="Button Label"
                value={button.label}
                onChange={(e) =>
                  handleButtonChange(index, 'label', e.target.value)
                }
                className="block w-1/2 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="Button URL"
                value={button.url}
                onChange={(e) =>
                  handleButtonChange(index, 'url', e.target.value)
                }
                className="block w-1/2 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddButton}
            className="mt-2 text-sm text-blue-600 hover:underline"
          >
            + Add Button
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
