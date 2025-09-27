import ChatSection from '../../_components/chatarea.js'

import { displayStyles, textStyles } from '@/app/_components/styles.js'

export default function ChatArea() {
   return (
      <div className={`flex-1 h-full w-full ${displayStyles.flex_row_center} ${textStyles.text_h5}`}>Select a contact to start messaging</div>
   )
}