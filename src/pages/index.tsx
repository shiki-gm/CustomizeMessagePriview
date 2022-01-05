import styles from './index.less';
import InputMessage from "../component/InputMessage";
import MessagePreview from "../component/MessagePreview";
import { useEffect, useState } from "react";
import { DragSortingUpload } from "../component/DragSortingUpload";


export default function IndexPage() {
	const [state, setState] = useState('')
  const feedbackValue = '#客户昵称##客户昵称#大叔大婶多sdfsfdsfsdfdsfdsaf'
  useEffect(() => {
    console.log('state', state);
    
  }, [state])
  return (

    <div className={styles.app}>
        {/* 个人项目上用 */}
        <InputMessage setState={setState} textVal={state} feedbackValue={feedbackValue}>
          <div>
            <div className={styles.line}></div>
            <DragSortingUpload/>
          </div>
        </InputMessage>
        <MessagePreview textVal={state}/>  
    </div>
  );
}
