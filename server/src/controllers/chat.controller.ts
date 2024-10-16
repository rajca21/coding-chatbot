import { NextFunction, Request, Response } from 'express';
import { ChatCompletionRequestMessage, OpenAIApi } from 'openai';

import User from '../models/User.model.js';
import { configureOpenAI } from '../config/openaiConfig.js';
import Chat from '../models/Chat.model.js';

// POST /api/v1/chats
export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message } = req.body;

    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).json({
        message: 'User not registered / Token expired!',
      });
    }

    // get users chats and append the new one
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as ChatCompletionRequestMessage[];
    chats.push({ content: message, role: 'user' });
    user.chats.push({ content: message, role: 'user' });

    // send all the chats to openAI
    const config = configureOpenAI();
    const openai = new OpenAIApi(config);

    // generate the response
    const chatResponse = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: chats,
    });
    user.chats.push(chatResponse.data.choices[0].message);

    // update the user & create new chat inside of DB for statistics
    await user.save();
    const newUserChat = new Chat({
      user: user._id,
      role: 'user',
      content: message,
    });
    newUserChat.save();
    const newAIChat = new Chat({
      user: user._id,
      role: 'assistant',
      content: chatResponse.data.choices[0].message.content,
    });
    newAIChat.save();

    return res.status(201).json({
      message: 'Chat added successfully!',
      chats: user.chats,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Something went wrong while generateChatCompletion: ' + error,
    });
  }
};

// GET /api/v1/chats
export const retrieveUserChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send('User not registered / Token expired!');
    }

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send('Permission denied!');
    }

    return res.status(200).json({
      message: 'Chats retrieved successfully!',
      chats: user.chats,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Something went wrong while retrieveUserChats: ' + error,
    });
  }
};

// DELETE /api/v1/chats
export const deleteUserChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send('User not registered / Token expired!');
    }

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send('Permission denied!');
    }

    //@ts-ignore
    user.chats = [];

    await user.save();

    return res.status(204).json({
      message: 'Chats deleted successfully!',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Something went wrong while deleteUserChats: ' + error,
    });
  }
};
