"use client";
import { GoogleGenAI } from "@google/genai";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Markdown from "react-markdown";
import { iDailyHoroscope, iWeeklyHoroscope } from "@/types/next";

const AiClient = ({
  todaysHoroscope,
  weeklyHoroscope,
}: {
  todaysHoroscope: iDailyHoroscope;
  weeklyHoroscope: iWeeklyHoroscope;
}) => {
  const systemPrompt = `
      You are Gemini Celestia, a helpful assistant specializing in astrology and horoscopes.
      Always respond in the following format:
      - **Summary**: A concise summary of the answer.\n
      - **Details**: A short explanation or advice.\n
      - **Astrological Context**: Relate the answer to astrology or horoscopes.\n
      Do not answer questions unrelated to astrology or horoscopes. If asked, politely decline.
      Keep the responses brief (about 500 characters only) and focused on astrology.
      Response in a way that even a 5 year old can understand.

      Today's horoscope: "${todaysHoroscope.date}: ${todaysHoroscope.horoscope_data}"
      Weekly history of my horoscope: "${weeklyHoroscope.week}: ${weeklyHoroscope.horoscope_data}"
    `;

  const [userInput, setUserInput] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      role: "assistant",
      content: "Hey star traveler 🌠, how can I guide you today?",
    },
  ]);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    setChatMessages((prev) => [
      ...prev,
      { role: "user", content: userInput },
      { role: "assistant", content: "..." },
    ]);

    setUserInput("");

    const ai = new GoogleGenAI({
      apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    });
    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      history: [
        {
          role: "model",
          parts: [{ text: systemPrompt }],
        },

        ...chatMessages.map((msg) => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }],
        })),
      ],
    });

    const stream = await chat.sendMessageStream({ message: userInput });
    let assistantMessage = "";

    for await (const chunk of stream) {
      assistantMessage += chunk.text;

      setChatMessages((prev) =>
        prev.map((msg, i) =>
          i === prev.length - 1 ? { ...msg, content: assistantMessage } : msg,
        ),
      );
    }
  };

  return (
    <Popover open={chatOpen} onOpenChange={setChatOpen}>
      <PopoverTrigger asChild>
        <Button className="fixed bottom-6 right-6 z-50">🧠 Ask Gemini</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] h-[500px] mr-6 mb-2 p-0 bg-zinc-900 border border-zinc-800 flex flex-col">
        <div className="p-3 border-zinc-800 font-medium text-purple-300">
          Gemini Celestia Assistant
        </div>
        <ScrollArea className="flex-1 px-3 py-2 space-y-2 overflow-y-auto">
          {chatMessages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                "text-sm rounded-xl p-2 my-2",
                msg.role === "user"
                  ? "bg-purple-700 self-end text-white rounded-br-none "
                  : "bg-zinc-800 text-zinc-300 rounded-bl-none",
              )}
            >
              <Markdown>{msg.content}</Markdown>
            </div>
          ))}
        </ScrollArea>
        <div className="p-3 border-t border-zinc-800">
          <div className="flex items-center gap-2">
            <Input
              className="flex-1"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about your stars..."
            />
            <Button onClick={handleSend}>Send</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AiClient;
