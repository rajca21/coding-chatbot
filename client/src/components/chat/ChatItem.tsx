import { Avatar, Box, Typography } from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import ChatBotImg from '../../assets/logo.png';
import { useAuth } from '../../context/AuthContext';
import { extractCodeFromString, isCodeBlock } from '../../utils/helpers';

const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: 'user' | 'assistant';
}) => {
  const messageBlocks = extractCodeFromString(content);
  const auth = useAuth();

  return role === 'assistant' ? (
    <Box sx={{ display: 'flex', p: 2, bgcolor: '#004d5612', my: 2, gap: 2 }}>
      <Avatar sx={{ ml: 0 }}>
        <img src={ChatBotImg} alt='assistant' width={'30px'} />
      </Avatar>
      <Box>
        {!messageBlocks && <Typography fontSize={'20px'}>{content}</Typography>}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block, idx) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter
                key={idx}
                style={coldarkDark}
                language='javascript'
              >
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography key={idx} sx={{ fontSize: '20px' }}>
                {block}
              </Typography>
            )
          )}
      </Box>
    </Box>
  ) : (
    <Box sx={{ display: 'flex', p: 2, bgcolor: '#004d56', gap: 2 }}>
      <Avatar sx={{ ml: 0, bgcolor: 'black', color: 'white' }}>
        {auth?.user?.name[0]}
        {auth?.user?.name.split(' ').length &&
          auth?.user?.name.split(' ').length > 1 &&
          auth?.user?.name.split(' ')[1][0]}
      </Avatar>
      <Box>
        <Typography fontSize={'20px'}>{content}</Typography>
      </Box>
    </Box>
  );
};

export default ChatItem;
