import { useState } from 'react'
import { Search, Send, Paperclip, MoreVertical } from 'lucide-react'

interface Conversation {
  id: number
  name: string
  lastMessage: string
  timestamp: string
  unread: number
  avatar: string
}

interface Message {
  id: number
  sender: string
  content: string
  timestamp: string
  isOwn: boolean
}

const Messages = (): React.JSX.Element => {
  const [selectedConversation, setSelectedConversation] = useState<number>(1)
  const [newMessage, setNewMessage] = useState<string>('')

  const conversations: Conversation[] = [
    {
      id: 1,
      name: 'John Doe',
      lastMessage: 'Thank you for the feedback on my evaluation.',
      timestamp: '2 hours ago',
      unread: 2,
      avatar: 'JD'
    },
    {
      id: 2,
      name: 'Jane Smith',
      lastMessage: 'I have submitted my progress report.',
      timestamp: '4 hours ago',
      unread: 0,
      avatar: 'JS'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      lastMessage: 'Could you please review my attachment details?',
      timestamp: '1 day ago',
      unread: 1,
      avatar: 'MJ'
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      lastMessage: 'The project documentation is ready.',
      timestamp: '2 days ago',
      unread: 0,
      avatar: 'SW'
    }
  ]

  const messages: { [key: number]: Message[] } = {
    1: [
      {
        id: 1,
        sender: 'John Doe',
        content: 'Hello, I wanted to discuss my mid-term evaluation results.',
        timestamp: '10:30 AM',
        isOwn: false
      },
      {
        id: 2,
        sender: 'You',
        content: 'Hi John! I\'d be happy to discuss your evaluation. Your performance has been quite good overall.',
        timestamp: '10:35 AM',
        isOwn: true
      },
      {
        id: 3,
        sender: 'John Doe',
        content: 'Thank you! I was wondering about the areas where I can improve.',
        timestamp: '10:40 AM',
        isOwn: false
      },
      {
        id: 4,
        sender: 'You',
        content: 'I think focusing on communication skills and project documentation would be beneficial. You\'re doing great with the technical aspects.',
        timestamp: '10:45 AM',
        isOwn: true
      },
      {
        id: 5,
        sender: 'John Doe',
        content: 'Thank you for the feedback on my evaluation.',
        timestamp: '2 hours ago',
        isOwn: false
      }
    ],
    2: [
      {
        id: 1,
        sender: 'Jane Smith',
        content: 'Good morning! I have completed my weekly tasks.',
        timestamp: '9:00 AM',
        isOwn: false
      },
      {
        id: 2,
        sender: 'You',
        content: 'Great work, Jane! Could you please submit your progress report?',
        timestamp: '9:15 AM',
        isOwn: true
      },
      {
        id: 3,
        sender: 'Jane Smith',
        content: 'I have submitted my progress report.',
        timestamp: '4 hours ago',
        isOwn: false
      }
    ]
  }

  const currentMessages = messages[selectedConversation] || []
  const currentConversation = conversations.find(c => c.id === selectedConversation)

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message to the backend
      console.log('Sending message:', newMessage)
      setNewMessage('')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Messages</h2>
        <p className="text-gray-600 mt-1">Communicate with students and manage conversations</p>
      </div>

      {/* Messages Interface */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden" style={{ height: '600px' }}>
        <div className="flex h-full">
          {/* Conversations List */}
          <div className="w-1/3 border-r border-gray-200 flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                    selectedConversation === conversation.id ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">{conversation.avatar}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {conversation.name}
                        </p>
                        <p className="text-xs text-gray-500">{conversation.timestamp}</p>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                    </div>
                    {conversation.unread > 0 && (
                      <div className="bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {conversation.unread}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {currentConversation?.avatar}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{currentConversation?.name}</p>
                  <p className="text-sm text-green-600">Online</p>
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                <MoreVertical size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {currentMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.isOwn
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.isOwn ? 'text-blue-100' : 'text-gray-500'
                      }`}
                    >
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                  <Paperclip size={20} />
                </button>
                <div className="flex-1">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Message Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-2xl font-bold text-gray-900">{conversations.length}</div>
          <div className="text-sm text-gray-600">Total Conversations</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-2xl font-bold text-blue-600">
            {conversations.reduce((sum, conv) => sum + conv.unread, 0)}
          </div>
          <div className="text-sm text-gray-600">Unread Messages</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-2xl font-bold text-green-600">
            {conversations.filter(c => c.unread === 0).length}
          </div>
          <div className="text-sm text-gray-600">Read Conversations</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-2xl font-bold text-purple-600">24h</div>
          <div className="text-sm text-gray-600">Avg Response Time</div>
        </div>
      </div>
    </div>
  )
}

export default Messages

