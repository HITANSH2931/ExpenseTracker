import React from 'react'
import EmojiPicker from 'emoji-picker-react';

const Emoji = ({setIcon,setOpenEmoji}) => {
  return (
    <div>

        <EmojiPicker width={300} height={300} onEmojiClick={(emojiData) => {
            
            setIcon(emojiData);
            setOpenEmoji(false);
        
        }}
            
            />
      
    </div>
  )
}

export default Emoji
