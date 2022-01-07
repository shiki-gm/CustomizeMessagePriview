
import { Button } from 'antd';
import { useState, useEffect } from 'react';
import { ImgInterface, RichText } from "./InputMessage";
import "./styles.less";

interface IProps {
  richText: RichText
}
export default function MessagePreview(props: IProps) {
  const { richText } = props
  const [state, setState] = useState('')
  
  useEffect(() => {
    let temp: any = document.createElement("div");
    temp.innerText = richText.text;
    let output = temp.innerText
    temp = null
    output = output.replace(/\&nbsp\;/gi, ' ')
    output = output.replace(/br/gi, '<br/>')

    // console.log('output', output);
    setState(output)
  }, [richText])

  return (
    <pre className='messagePreview'>
      <div dangerouslySetInnerHTML={{__html: state}} />
      {richText.files.map((item: ImgInterface) => (<div key={item.uid} >
        <img src={item.url as any} alt={item.name} />
      </div>))}
    </pre>
  );
}
