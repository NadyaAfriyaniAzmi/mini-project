import React, { useState } from "react";
import Chat from "../components/Chat";
import { OpenAIApi, Configuration } from "openai";
import Navbar from "../components/Navbar";

function ChatBox() {
  const [result, setResult] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const handleResult = async () => {
    setLoading(true);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.5,
      max_tokens: 4000,
    });
    setResult(response?.data.choices[0].text);
    setLoading(false);
  };

  console.log("result :", result);

  return (
    <>
      <Navbar showLogout={true} showNavbar={true} />
      <section className="w-screen h-screen flex flex-col  items-center pt-20">
        <div className="w-full max-w-screen-lg">
          <div className="bg-white shadow-lg p-8 rounded-md text-center">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Chat Box</h1>
            <div className="flex gap-4 ">
              <Chat
                id="openai"
                placeholder="Tulis pertanyaan Anda di sini"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <button
                onClick={handleResult}
                className="h-10 border border-blue-500 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 "
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                  Kirim
                </span>
              </button>
            </div>
            {loading && <div className="mt-2 text-blue-500">Sedang memproses...</div>}
          </div>
          <div className="bg-white shadow-lg mt-5 p-5 rounded-md">
            <textarea
              value={result}
              onChange={(e) => setResult(e.target.value)}
              className="w-full h-60 rounded-md shadow-md bg-gray-100 p-3 text-gray-800 border border-blue-500"
            />
          </div>
        </div>
      </section>
    </>
  );
}
export default ChatBox;
