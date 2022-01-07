import styles from './index.less';
import InputMessage, {ImgInterface, RichText} from "../component/InputMessage";
import MessagePreview from "../component/MessagePreview";
import { useEffect, useState } from "react";
import { DragSortingUpload } from "../component/DragSortingUpload";


export default function IndexPage() {
	const [richText, setRichText] = useState<RichText>({
    text: '',
    files: [
      {
        name: "064E7D39-9DE3-49F8-8456-09F5209D0E4C_1636941868160a6f6f885.png",
        status: "done",
        uid: '-4052770',
        url: "https://qimai-1251581441.cos.ap-shanghai.myqcloud.com/qimai-mp/test/1457587149057691648/2021-11-15/064E7D39-9DE3-49F8-8456-09F5209D0E4C_1636941868160a6f6f885.png"
      }
    ]
  })
  const feedbackValue = '#客户昵称##客户昵称#大叔大婶多sdfsfdsfsdfdsfdsaf'
  useEffect(() => {
    // console.log('richText', richText);
    
  }, [richText])
  return (

    <div className={styles.app}>
        {/* 个人项目上用 */}
        <InputMessage setRichText={setRichText} richText={richText} feedbackValue={feedbackValue}>
          <div>
            <div className={styles.line}></div>
            <DragSortingUpload setRichText={setRichText} richText={richText}/>
          </div>
        </InputMessage>
        <MessagePreview richText={richText}/>  
    </div>
  );
}
