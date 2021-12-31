
import { Button } from 'antd';
import { useState, useEffect } from 'react';
import "./styles.less";

export default function MessagePreview(props) {
  const {textVal} = props
  const [state, setState] = useState('')
  
  useEffect(() => {
    var temp = document.createElement("div");
    temp.innerHTML = textVal;
    var output = temp.innerText
    temp = null
    output = output.replace(/\&nbsp\;/gi, ' ')
    output = output.replace(/br/gi, '<br/>')

    console.log('output', output);
    setState(output)
  }, [textVal])
  return (
    <div className='messagePreview'>
      <div dangerouslySetInnerHTML={{__html: state}} />
    </div>
  );
}
