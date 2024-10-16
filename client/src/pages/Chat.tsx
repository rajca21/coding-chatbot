import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Avatar, Box, Button, IconButton, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import { IoMdSend } from 'react-icons/io';
import toast from 'react-hot-toast';

import ChatBotImg from '../assets/logo.png';
import { useAuth } from '../context/AuthContext';
import ChatItem from '../components/chat/ChatItem';
import {
  deleteUserChats,
  getUserChats,
  sendMessageRequest,
} from '../utils/apiCommunicator';
import { updateScroll } from '../utils/helpers';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const Chat = () => {
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const messagesRef = document.getElementById('messages') as HTMLElement;
  const auth = useAuth();

  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = '';
    }

    const newMessage: Message = {
      role: 'user',
      content: content,
    };
    setChatMessages((prev) => [...prev, newMessage]);

    const chatData = await sendMessageRequest(content);
    setChatMessages([...chatData.chats]);
  };

  const handleChatDelete = async () => {
    try {
      toast.loading('Deleting chats...', { id: 'chats-delete' });
      await deleteUserChats();
      setChatMessages([]);
      toast.success('Conversation cleared!', { id: 'chats-delete' });
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong while deleting chats!', {
        id: 'chats-delete',
      });
    }
  };

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading('Retrieving chats...', {
        id: 'chat-loading',
      });

      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success('Chats retrieved successfully', {
            id: 'chat-loading',
          });
        })
        .catch((err) => {
          console.error(err);
          toast.error('Something went wrong while retrieving chats', {
            id: 'chat-loading',
          });
        });
    }

    updateScroll(messagesRef);
  }, [auth]);

  useEffect(() => {
    updateScroll(messagesRef);
  }, [chatMessages]);

  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        width: '100%',
        height: '100%',
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: {
            md: 'flex',
            xs: 'none',
          },
          flex: 0.2,
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            height: '60vh',
            bgcolor: 'rgb(17,29,39)',
            borderRadius: 5,
            flexDirection: 'column',
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: 'auto',
              my: 2,
              bgcolor: 'white',
              color: 'black',
              fontWeight: 700,
            }}
          >
            {auth?.user?.name[0]}
            {auth?.user?.name.split(' ').length &&
              auth?.user?.name.split(' ').length > 1 &&
              auth?.user?.name.split(' ')[1][0]}
          </Avatar>
          <Typography sx={{ mx: 'auto', fontFamily: 'work sans' }}>
            Start talking to a Coding-GPT
          </Typography>
          <Typography sx={{ mx: 'auto', fontFamily: 'work sans', p: 3, my: 1 }}>
            This ChatBot was made for programming questions, but you can ask it
            questions related to business, education, statistics, general
            knowledge etc.
          </Typography>
          <Button
            onClick={handleChatDelete}
            sx={{
              width: '200px',
              mt: 'auto',
              mb: 2.5,
              mx: 'auto',
              color: 'white',
              fontWeight: 700,
              borderRadius: 3,
              bgcolor: red[300],
              ':hover': {
                bgcolor: red.A400,
              },
            }}
          >
            clear conversation
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flex: {
            md: 0.8,
            xs: 1,
          },
          flexDirection: 'column',
          px: 3,
        }}
      >
        <Typography
          sx={{
            textAlign: 'center',
            fontSize: '40px',
            color: 'white',
            mb: 2,
            mx: 'auto',
          }}
        >
          Model - GPT 3.5 Turbo
        </Typography>
        <Box
          sx={{
            width: '100%',
            height: '60vh',
            borderRadius: 3,
            mx: 'auto',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'scroll',
            overflowX: 'hidden',
            overflowY: 'auto',
            scrollBehavior: 'smooth',
          }}
          id='messages'
        >
          {chatMessages.length === 0 && (
            <div className='noChats'>
              <h2>No messages yet!</h2>
              <p>Don't be shy! Ask Coding-GPT anything</p>
              <img src={ChatBotImg} alt='chatbot' />
            </div>
          )}
          {chatMessages.map((chat, idx) => (
            <ChatItem key={idx} content={chat.content} role={chat.role} />
          ))}
        </Box>
        <div className='chatinputContainer'>
          <input
            ref={inputRef}
            type='text'
            placeholder='Type here...'
            className='chatinput'
          />
          <IconButton
            onClick={handleSubmit}
            sx={{ ml: 'auto', color: 'white' }}
          >
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
