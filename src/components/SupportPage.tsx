import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Mail, MessageCircle, Bot, Send } from 'lucide-react';

interface SupportPageProps {
  onBack: () => void;
}

const SupportPage: React.FC<SupportPageProps> = ({ onBack }) => {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [showChatBot, setShowChatBot] = useState(false);
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [chatInput, setChatInput] = useState('');

  const handleEmailSupport = () => {
    window.open('mailto:bluepaycompany@gmail.com?subject=Support Request&body=' + encodeURIComponent(message));
  };

  const handleTelegramSupport = () => {
    window.open('https://t.me/Bluepaysupport1', '_blank');
  };

  const handleChatBot = () => {
    window.open('http://telegram.me/Userbluepay_bot', '_blank');
  };

  const sendChatMessage = () => {
    if (chatInput.trim()) {
      setChatMessages([...chatMessages, `You: ${chatInput}`, `Bot: Thank you for your message. Our support team will get back to you shortly.`]);
      setChatInput('');
    }
  };

  if (showChatBot) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-blue-600 px-4 py-4 flex items-center gap-3">
          <button onClick={() => setShowChatBot(false)} className="text-white">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-semibold text-white">Chat Support</h1>
        </div>

        <div className="flex flex-col h-[calc(100vh-64px)]">
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <p className="text-sm">Bot: Hello! How can I help you today?</p>
              </div>
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg ${
                    msg.startsWith('You:') ? 'bg-gray-100 ml-8' : 'bg-blue-100 mr-8'
                  }`}
                >
                  <p className="text-sm">{msg}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-4 bg-white border-t">
            <div className="flex gap-2">
              <Input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
              />
              <Button onClick={sendChatMessage} className="bg-blue-600 hover:bg-blue-700">
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 px-4 py-4 flex items-center gap-3">
        <button onClick={onBack} className="text-white">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-semibold text-white">Support</h1>
      </div>

      <div className="p-4 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-gray-900">How can we help you?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleEmailSupport}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center gap-3"
            >
              <Mail size={20} />
              Email Support
            </Button>
            
            <Button
              onClick={handleTelegramSupport}
              className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-xl flex items-center gap-3"
            >
              <MessageCircle size={20} />
              Telegram Support
            </Button>
            
            <Button
              onClick={handleChatBot}
              className="w-full h-12 bg-green-500 hover:bg-green-600 text-white rounded-xl flex items-center gap-3"
            >
              <Bot size={20} />
              Chat Bot
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900">Send us a message</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              type="email"
              className="h-12 rounded-xl"
            />
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your issue..."
              className="min-h-[100px] rounded-xl"
            />
            <Button
              onClick={handleEmailSupport}
              className="w-full h-12 bg-gray-800 hover:bg-gray-900 text-white rounded-xl"
            >
              Send Message
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Contact Information</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>Email: support@bluepay.com</p>
              <p>Phone: +234 800 BLUEPAY</p>
              <p>Hours: 24/7 Support Available</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SupportPage;
