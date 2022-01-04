import styles from './index.less';
import InputMessage from "../component/InputMessage";
import MessagePreview from "../component/MessagePreview";
import { useState } from "react";
import { DragSortingUpload } from "../component/DragSortingUpload";
import 'antd/dist/antd.css';
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider  } from "antd";


export default function IndexPage() {
	const [state, setState] = useState('')
  
  return (

    <div className={styles.app}>
            {/* 标准的到这里就可以了 */}
      {/* <InputMessage setState={setState} textVal={state} /> */}
      <ConfigProvider locale={zhCN}>
        {/* <App /> */}
        {/* 个人项目上用 */}
        <InputMessage setState={setState} textVal={state}>
          <div>
            <div className={styles.line}></div>
            <DragSortingUpload/>
          </div>
        </InputMessage>
        <MessagePreview textVal={state}/>  
      </ConfigProvider>
    </div>
  );
}
