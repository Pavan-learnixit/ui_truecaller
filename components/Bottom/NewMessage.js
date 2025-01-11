import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { useRoute } from '@react-navigation/native';

const NewMessage = () => {
  const [messages, setMessages] = useState([]);
  const route = useRoute();

  useEffect(() => {
    // Extract SMS data from the route
    const { sms } = route.params || {};

    if (sms) {
      setMessages([
        {
          _id: sms.date, // Use unique ID (date or another unique property)
          text: sms.body, // SMS content
          createdAt: new Date(sms.date), // Convert date to proper Date format
          user: {
            _id: 2, // Assume SMS sender has ID 2
            name: sms.address || 'Unknown Sender', // SMS sender address
            avatar: 'https://placeimg.com/140/140/any', // Default avatar
          },
        },
      ]);
    } else {
      // Default message if no SMS is passed
      setMessages([
        {
          _id: 1,
          text: 'No SMS available',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'System',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ]);
    }
  }, [route.params]);

  const onSend = (messageArray) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messageArray)
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1, // Current user ID
        }}
      />
    </View>
  );
};

export default NewMessage;
