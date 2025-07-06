"use client";
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

const AiClient = () => {
  const [userInput, setUserInput] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      role: "assistant",
      content: "Hey star traveler 🌠, how can I guide you today?",
    },
  ]);

  const handleSend = () => {
    if (!userInput.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      { role: "user", content: userInput },
      {
        role: "assistant",
        content: `Sorry, I'm a mock Gemini bot right now 🤖✨`,
      },
    ]);
    setUserInput("");
  };
  return (
    <Popover open={chatOpen} onOpenChange={setChatOpen}>
      <PopoverTrigger asChild>
        <Button className="fixed bottom-6 right-6 z-50">🧠 Ask Gemini</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] h-[500px] mr-6 mb-2 p-0 bg-zinc-900 border border-zinc-800 flex flex-col">
        <div className="p-3 border-b border-zinc-800 font-medium text-indigo-300">
          Gemini Astro Assistant
        </div>
        <ScrollArea className="flex-1 px-3 py-2 space-y-2 overflow-y-auto">
          {chatMessages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                "text-sm rounded p-2 my-2",
                msg.role === "user"
                  ? "bg-indigo-700 self-end text-white"
                  : "bg-zinc-800 text-zinc-300",
              )}
            >
              {msg.content}
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
